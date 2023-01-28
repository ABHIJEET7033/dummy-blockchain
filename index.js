const { json } = require("body-parser");
const bodyParser=require("body-parser");
const express=require("express");
const request=require("request");
const Blockchain=require("./blockchain");
const PubSub=require("./publishsubscribe");

const app = express();
const blockchain=new Blockchain();
const pubsub=new PubSub({blockchain});


const DEFAULT_PORT=3001;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;
setTimeout(() => pubsub.broadcastChain(),1000);

app.use(bodyParser.json());
app.get("/api/blocks",(req,res)=>{
    res.json(blockchain.chain);
});


app.post("/api/mine",(req,res) => {
    const { data } = req.body;

    blockchain.addblock({data});

    pubsub.broadcastChain();
    
    res.redirect('/api/blocks');
});

const synChains = () =>{
    request({url:`${ROOT_NODE_ADDRESS}/api/blocks`},(error,response,body)=>{
        if(!error && response.statusCode===200){
            const rootchain = JSON.parse(body);
            console.log('replace chain with sync chain',rootchain);
            blockchain.replacechain(rootchain);
        }
    })
}
let PEER_PORT;

if(process.env.GENERATE_PEER_PORT=='true'){
    PEER_PORT=DEFAULT_PORT + Math.ceil(Math.random()*1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT,() => {
    console.log(`APP LISTEN TO : ${PORT}`);
    synChains();
});