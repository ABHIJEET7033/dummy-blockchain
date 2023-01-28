const { GENESIS_DATA, MINE_RATE } = require('./genesis');
const hexToBinary=require("hex-to-binary");
const cryptohash=require('./cryptohash');
class block{
    constructor({timestamp,data,prevhash,hash,difficulty=1,nonce}){
        this.timestamp=timestamp;
        this.data=data;
        this.prevhash=prevhash;
        this.hash=hash;
        this.difficulty=difficulty;
        this.nonce=nonce;
    }

    static genesis(){
        return new block(GENESIS_DATA);
    }
    static mineblock({ prevblock, data }){
      
          let hash,timestamp;
          const prevhash=prevblock.hash;
          let { difficulty } = prevblock;
          
          let nonce=0;
          do{
            nonce++;
            timestamp=Date.now();
            difficulty=block.adjustdifficulty({
              originalblock:prevblock,
              timestamp,
            });
           
            hash=cryptohash(timestamp,data,prevhash,difficulty,nonce);
          }while
          (
            hexToBinary(hash.substring(0,difficulty))!=="0".repeat(difficulty)
          );
            
          return new this({
            timestamp,
            prevhash,
            data,
            hash,
            difficulty,
            nonce
          });
          
          
     }
     static adjustdifficulty({originalblock,timestamp}){
      
        const { difficulty } = originalblock;

        if(difficulty < 1)
        return 1;

        const difference = timestamp - originalblock.timestamp;
        
        if(difference > MINE_RATE) return difficulty-1;
        return  difficulty+1;

    }
}

const block1 = new block({
    hash:"0xacb",
    timestamp:Date.now(),
    prevhash:"0xc12",
    data:"hello",
})

// const genesisblock = block.genesis();
// console.log(genesisblock);

// const result = block.mineblock({ prevblock: block1, data: "block2" });
// console.log(result);
module.exports = block;