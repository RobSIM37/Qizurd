const arrUtil = require("./arrayUtils");

const ID_LENGTH = 20;
const charSet = [];

const buildCharSet = (start, end) => {
    const charSet = [];
    let startVal = start.charCodeAt(0);
    let endVal = end.charCodeAt(0);
    for (let addVal = startVal; addVal <= endVal; addVal++) {
        charSet.push(String.fromCharCode(addVal))
    }
    return charSet;
}

const generateCharSet = () => {
    charSet = [...charSet, ...buildCharSet("0","9")];
    charSet = [...charSet, ...buildCharSet("a","z")];
    charSet = [...charSet, ...buildCharSet("A","Z")];
}

const rndChar = () => {
    return charSet[arrUtil.getRandomArrayIndex(charSet)]
}

module.exports = () => {
    generateCharSet();
    const id = [];
    for (let char = 0; char < ID_LENGTH; char++){
        id.push(rndChar());
    }
    return id.join("");
}