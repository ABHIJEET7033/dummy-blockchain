const Blockchain=require('./blockchain');
const blockchain = new Blockchain();
blockchain.addblock({data : "block 2"});

let prevTimestamp,nextTimestamp,nextblock,averagetime,timeDiff;

const times = [];

for(let i=0;i<1000;i++){
      prevTimestamp=blockchain.chain[blockchain.chain.length-1].timestamp;
      blockchain.addblock({data : `block ${i}`});
      nextblock=blockchain.chain[blockchain.chain.length-1];
      nextTimestamp=nextblock.timestamp;
      timeDiff = nextTimestamp - prevTimestamp;

      times.push(timeDiff);

      averagetime=times.reduce((total,num)=>(total+num))/times.length;
      
     // console.log(`thr average time to mine block :'${timeDiff}, difficulty:${nextblock.difficulty} , averagetime is ${averagetime}`);
}

