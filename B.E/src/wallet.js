const elliptic_1 = require("elliptic");
const EC = new elliptic_1.ec('secp256k1');
const fs_1 = require("fs");
const _ = require("lodash");
const transaction_1 = require("./transaction");
const wallets = require('../node/wallet/wallets.json')
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./node/wallet/wallets.json');
const db = low(adapter);

const getWallets = () => {
    return db.get('wallets').value();
}
exports.getWallets = getWallets;

const createWallet = () => {
    const index =  db.get('wallets').size().value() + 1;
    // const index = wallets.size() + 1;
    const privateKey = generatePrivateKey();
    const key = EC.keyFromPrivate(privateKey, 'hex');
    const publicKey = key.getPublic().encode('hex');

    if(db.get('wallets').find({ publicKey: publicKey }).value() != null){
        return ;
    }

    return db.get('wallets').push({ index: index, publicKey: publicKey, privateKey: privateKey}).write();
}
exports.createWallet = createWallet;

const generatePrivateKey = () => {
    const keyPair = EC.genKeyPair();
    const privateKey = keyPair.getPrivate();
    return privateKey.toString(16);
};
exports.generatePrivateKey = generatePrivateKey;

const getPrivateFromWallet = (address) => {
    const private_key = db.get('wallets').find({ publicKey: address }).value().privateKey;
    // const buffer = fs_1.readFileSync(privateKeyLocation, 'utf8');
    // return buffer.toString();
    console.log("privateKey" + private_key);
    return private_key;
};
exports.getPrivateFromWallet = getPrivateFromWallet;

// const initWallet = () => {
//     // let's not override existing private keys
//     if (fs_1.existsSync(privateKeyLocation)) {
//         return;
//     }
//     const newPrivateKey = generatePrivateKey();
//     fs_1.writeFileSync(privateKeyLocation, newPrivateKey);
//     console.log('new wallet with private key created');
// };
// exports.initWallet = initWallet;

const getPublicFromWallet = () => {
    const privateKey = getPrivateFromWallet();
    const key = EC.keyFromPrivate(privateKey, 'hex');
    return key.getPublic().encode('hex');
};
exports.getPublicFromWallet = getPublicFromWallet;

const getBalance = (address, unspentTxOuts) => {
    return _(findUnspentTxOuts(address, unspentTxOuts))
        .map((uTxO) => uTxO.amount)
        .sum();
};
exports.getBalance = getBalance;

const findTxOutsForAmount = (amount, myUnspentTxOuts) => {
    let currentAmount = 0;
    const includedUnspentTxOuts = [];
    for (const myUnspentTxOut of myUnspentTxOuts) {
        includedUnspentTxOuts.push(myUnspentTxOut);
        currentAmount = currentAmount + myUnspentTxOut.amount;
        if (currentAmount >= amount) {
            const leftOverAmount = currentAmount - amount;
            return { includedUnspentTxOuts, leftOverAmount };
        }
    }
    const eMsg = 'Cannot create transaction from the available unspent transaction outputs.' +
        ' Required amount:' + amount + '. Available unspentTxOuts:' + JSON.stringify(myUnspentTxOuts);
    throw Error(eMsg);
};

const createTransaction = (address, receiverAddress, amount, privateKey, unspentTxOuts, txPool) => {
    console.log('txPool: %s', JSON.stringify(txPool));
    // const myAddress = transaction_1.getPublicKey(privateKey);
    const myAddress = address;
    const myUnspentTxOutsA = unspentTxOuts.filter((uTxO) => uTxO.address === myAddress);
    const myUnspentTxOuts = filterTxPoolTxs(myUnspentTxOutsA, txPool);
    // filter from unspentOutputs such inputs that are referenced in pool
    const { includedUnspentTxOuts, leftOverAmount } = findTxOutsForAmount(amount, myUnspentTxOuts);
    const toUnsignedTxIn = (unspentTxOut) => {
        const txIn = new transaction_1.TxIn();
        txIn.txOutId = unspentTxOut.txOutId;
        txIn.txOutIndex = unspentTxOut.txOutIndex;
        return txIn;
    };
    const unsignedTxIns = includedUnspentTxOuts.map(toUnsignedTxIn);
    const tx = new transaction_1.Transaction();
    tx.txIns = unsignedTxIns;
    tx.txOuts = createTxOuts(receiverAddress, myAddress, amount, leftOverAmount);
    tx.id = transaction_1.getTransactionId(tx);
    tx.txIns = tx.txIns.map((txIn, index) => {
        txIn.signature = transaction_1.signTxIn(tx, index, privateKey, unspentTxOuts);
        return txIn;
    });
    return tx;
};
exports.createTransaction = createTransaction;

const createTxOuts = (receiverAddress, myAddress, amount, leftOverAmount) => {
    const txOut1 = new transaction_1.TxOut(receiverAddress, amount);
    if (leftOverAmount === 0) {
        return [txOut1];
    }
    else {
        const leftOverTx = new transaction_1.TxOut(myAddress, leftOverAmount);
        return [txOut1, leftOverTx];
    }
};

// const deleteWallet = () => {
//     if (fs_1.existsSync(privateKeyLocation)) {
//         fs_1.unlinkSync(privateKeyLocation);
//     }
// };
// exports.deleteWallet = deleteWallet;

const findUnspentTxOuts = (ownerAddress, unspentTxOuts) => {
    return _.filter(unspentTxOuts, (uTxO) => uTxO.address === ownerAddress);
};
exports.findUnspentTxOuts = findUnspentTxOuts;

const filterTxPoolTxs = (unspentTxOuts, transactionPool) => {
    const txIns = _(transactionPool)
        .map((tx) => tx.txIns)
        .flatten()
        .value();
    const removable = [];
    for (const unspentTxOut of unspentTxOuts) {
        const txIn = _.find(txIns, (aTxIn) => {
            return aTxIn.txOutIndex === unspentTxOut.txOutIndex && aTxIn.txOutId === unspentTxOut.txOutId;
        });
        if (txIn === undefined) {
        }
        else {
            removable.push(unspentTxOut);
        }
    }
    return _.without(unspentTxOuts, ...removable);
};