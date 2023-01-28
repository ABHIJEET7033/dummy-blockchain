const Block = require('./block');
const cryptohash=require('./cryptohash')
class blockchain{
    constructor(){
        this.chain = [Block.genesis()];
    }
    
    addblock({ data }){
        
        const newBlock = Block.mineblock({
            prevblock: this.chain[this.chain.length-1],
            data,
        });
        
         this.chain.push(newBlock);
    }
     

    replacechain(chain){
        if(chain.length <= this.chain.length){
            console.error("this chain is shorter");
            return;
        }
        if(blockchain.isvalidchain(chain)==false)
        {
            console.error("the chain is wrong to add");
            return;
        }

        this.chain=chain;
    }
    static isvalidchain(chain){
        if(JSON.stringify(chain[0])!== JSON.stringify(Block.genesis())) return false;


        for(let i=1;i<chain.length;i++){
            const {timestamp,data,prevhash,hash,difficulty,nonce} = chain[i];

            const lastdifficulty=chain[i-1].difficulty;
            const reallasthash = chain[i-1].hash;
            if(prevhash!==reallasthash)
            return false;

            const validatehash=cryptohash(timestamp,data,prevhash,difficulty,nonce);
            if(hash!==validatehash) return false;
            if(Math.abs(lastdifficulty-difficulty) > 1) return false;
        }
        return true;
    }
};


// const Blockchain=new blockchain();
// Blockchain.addblock({ data :"newblock "});
// Blockchain.addblock({ data :"newblock2 "});
// console.log(Blockchain.chain);
// console.log(Blockchain);
module.exports = blockchain;