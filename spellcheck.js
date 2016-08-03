const spellchecker = require('spellchecker')


function spellCheck(val){
  if (spellchecker.isMisspelled(val)){
    let rightWord = (spellchecker.getCorrectionsForMisspelling(val)[0]).toString()
    return `Correct spelling for ${val} is ${rightWord}`;
  } else{
    return "Everything is A-OK";
  }
}

module.exports = spellCheck;
