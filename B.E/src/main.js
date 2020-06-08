const bodyParser = require("body-parser");
const express = require("express");
const blockchain_1 = require("./class/blockchain");
const p2p_1 = require("./class/p2p");
const wallet_1 = require("./wallet");
const elliptic_1 = require("elliptic");
const EC = new elliptic_1.ec('secp256k1');
const transactionPool_1 = require("./transactionPool");
const _ = require("lodash");
const cors = require('cors');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./node/wallet/wallets.json');
const db = low(adapter);

const httpPort = parseInt(process.env.HTTP_PORT) || 3001;
const p2pPort = parseInt(process.env.P2P_PORT) || 6001;

const initHttpServer = (myHttpPort) => {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.get('/wallets', (req, res) => {
        const ret = wallet_1.getWallets();
        res.send(ret);
    })

    app.post('/create-wallet', (req, res) => {
        const ret = wallet_1.createWallet();
        res.send(ret);
    })

    app.get('/blocks', (req, res) => {
        res.send(blockchain_1.getBlockchain());
    });
    
    app.get('/block/:hash', (req, res) => {
        const block = _.find(blockchain_1.getBlockchain(), { 'hash': req.params.hash });
        res.send(block);
    });

    app.get('/transaction/:id', (req, res) => {
        const tx = _(blockchain_1.getBlockchain())
            .map((blocks) => blocks.data)
            .flatten()
            .find({ 'id': req.params.id });
        res.send(tx);
    });

    app.get('/address/:address', (req, res) => {
        const unspentTxOuts = _.filter(blockchain_1.getUnspentTxOuts(), (uTxO) => uTxO.address === req.params.address);
        res.send({ 'unspentTxOuts': unspentTxOuts });
    });

    app.get('/unspentTransactionOutputs', (req, res) => {
        res.send(blockchain_1.getUnspentTxOuts());
    });

    app.get('/myUnspentTransactionOutputs', (req, res) => {
        res.send(blockchain_1.getMyUnspentTransactionOutputs());
    });

    app.post('/mineRawBlock', (req, res) => {
        if (req.body.data == null) {
            res.send('data parameter is missing');
            return;
        }
        const newBlock = blockchain_1.generateRawNextBlock(req.body.data);
        if (newBlock === null) {
            res.status(400).send('could not generate block');
        }
        else {
            res.send(newBlock);
        }
    });

    app.post('/mineBlock/:address', (req, res) => {
        
        console.log(req.params.address);
        const newBlock = blockchain_1.generateNextBlock(req.params.address);
        if (newBlock === null) {
            res.status(400).send('could not generate block');
        }
        else {
            res.send(newBlock);
        }
    });

    app.get('/balance/:address', (req, res) => {
        console.log(req.params.address);
        const balance = blockchain_1.getAccountBalance(req.params.address);
        res.send({ 'balance': balance });
    });

    app.get('/address', (req, res) => {
        const address = wallet_1.getPublicFromWallet();
        res.send({ 'address': address });
    });

    app.post('/mineTransaction', (req, res) => {
        const address = req.body.address;
        const amount = req.body.amount;
        try {
            const resp = blockchain_1.generatenextBlockWithTransaction(address, amount);
            res.send(resp);
        }
        catch (e) {
            console.log(e.message);
            res.status(400).send(e.message);
        }
    });

    app.post('/sendTransaction/:address', (req, res) => {
        try {
            const address = req.params.address;
            const receiverAddress = req.body.receiverAddress;
            const amount = req.body.amount;
            if (receiverAddress === undefined || amount === undefined) {
                throw Error('invalid address or amount');
            }
            const resp = blockchain_1.sendTransaction(address ,receiverAddress, amount);
            res.send(resp);
        }
        catch (e) {
            console.log(e.message);
            res.status(400).send(e.message);
        }
    });

    app.get('/transactionPool', (req, res) => {
        res.send(transactionPool_1.getTransactionPool());
    });

    app.get('/peers', (req, res) => {
        res.send(p2p_1.getSockets().map((s) => s._socket.remoteAddress + ':' + s._socket.remotePort));
    });

    app.post('/addPeer', (req, res) => {
        p2p_1.connectToPeers(req.body.peer);
        res.send();
    });

    app.post('/stop', (req, res) => {
        res.send({ 'msg': 'stopping server' });
        process.exit();
    });
    
    app.use((err, req, res, next) => {
        if (err) {
            res.status(400).send(err.message);
        }
    });

    app.listen(myHttpPort, () => {
        console.log('Listening http on port: ' + myHttpPort);
    });
};

initHttpServer(httpPort);
p2p_1.initP2PServer(p2pPort);
// wallet_1.initWallet();
