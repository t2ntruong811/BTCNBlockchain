const bodyParser = require("body-parser");
const express = require("express");
const blockchain_1 = require("./class/blockchain");
const p2p_1 = require("./class/p2p");
const wallet_1 = require("./wallet");

const httpPort = parseInt(process.env.HTTP_PORT) || 3001;
const p2pPort = parseInt(process.env.P2P_PORT) || 6001;

const initHttpServer = (myHttpPort) => {
    const app = express();

    app.use(bodyParser.json());

    app.get('/blocks', (req, res) => {
        res.send(blockchain_1.getBlockchain());
    });

    app.post('/mineBlock', (req, res) => {
        // if (req.body.data == null) {
        //     res.send('data parameter is missing');
        //     return;
        // }
        // const newBlock = blockchain_1.generateNextBlock(req.body.data);
        // if (newBlock === null) {
        //     res.status(400).send('could not generate block');
        // }
        // else {
        //     res.send(newBlock);
        // }
        const newBlock = blockchain_1.generateNextBlock();
        if (newBlock === null) {
            res.status(400).send('could not generate block');
        }
        else {
            res.send(newBlock);
        }
    });

    app.get('/peers', (req, res) => {
        res.send(p2p_1.getSockets().map((s) => s._socket.remoteAddress + ':' + s._socket.remotePort));
    });

    app.post('/addPeer', (req, res) => {
        p2p_1.connectToPeers(req.body.peer);
        res.send();
    });

    app.get('/balance', (req, res) => {
        const balance = blockchain_1.getAccountBalance();
        res.send({ 'balance': balance });
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
wallet_1.initWallet();
