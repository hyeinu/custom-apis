const Filter = require('bad-words')
filter = new Filter();

module.exports = function cleanUp(str){
  return filter.clean(str);
} 
