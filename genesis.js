const INITIAL_DIFFICULTY=2;
const MINE_RATE=1000; //millisecond == 1 sec
const GENESIS_DATA={
    timestamp:1,
    data:[],
    prevhash:'01ebh',
    hash:'02jky',
    difficulty:INITIAL_DIFFICULTY,
    nonce:0
}

module.exports = { GENESIS_DATA,MINE_RATE };