const PORT = 8000;

const http = require('http')
const moment = require('moment')
const md5 = require('md5')
const spellCheck = require('./spellcheck.js')
const VocabFetcher = require('vocab-fetcher')
const vocabFetcher = new VocabFetcher();
const cleanUp = require('./badwords.js')




let server = http.createServer((req, res) =>{

// let urlParts = res.url.match(/[^/]+/g || []);
// let path = urlParts[0]

let [ , path, ...inputs] = req.url.split('/')

  switch(path){
    case 'add':
      let result =  inputs.reduce((num, next)=>{
        return num + parseInt(next);
      }, 0);
      res.end(`The result is ${result}\n`)
    break;
    case 'minus':
      let sum =  inputs.reduce((num, next)=>{
        return num - parseInt(next);
      });
      res.end(`The result is ${sum}\n`)
    break;
    case 'multiply':
      let product =  inputs.reduce((num, next)=>{
        return num * parseInt(next);
      });
      res.end(`The result is ${product}\n`)
    break;
    case 'divide':
      let dividen =  inputs.reduce((num, next)=>{
        return num / parseInt(next);
      });
      res.end(`The result is ${dividen}\n`)
    break;
    case 'power':
      let power =  inputs.reduce((num, next)=>{
        return Math.pow(num, next);
      });
      res.end(`The result is ${power}\n`)
    break;
    case 'gravatar':
      let email = "" + inputs[0];
      let hash = md5(email);
      res.end( `http://www.gravatar.com/avatar${hash}\n`)
    break;
    case 'sentence':
      let decodedSentence = decodeURI(inputs.join(''))
      let decArrs = decodedSentence.match(/\w+/g)
      let decArrsNum = decArrs.map(num =>{
        return num.length
      })
      let decodedObj ={
        word_count: decArrs.length,
        character_count: decodedSentence.match(/\S/g).length,
        average_word_length: (decArrsNum.reduce((num, next) => {
          return num + next}, 0) / decArrsNum.length).toFixed(1)
        }
      res.end(JSON.stringify(decodedObj))
    break;
    case 'age':
      let yearNow = moment().format("YYYY");
      let birthYear = parseInt(yearNow) - parseInt(inputs[0]);
      res.end(`You were born in ${birthYear}`)
    break;
    case '8ball':
      let resultsArr = ["Yes", "Sure", "Not sure.", "Consult the stars", "Maybe Next Year"];
      let randomNum = Math.floor(Math.random()*resultsArr.length)
      res.end("" + resultsArr[randomNum])
    break;
    case 'spellcheck':
      let word = inputs[0].toString()
      res.end(`${spellCheck(word)}`)
    break;
    case 'define':
      let defineWord = inputs[0].toString();
      vocabFetcher.getWord(`${defineWord}`).then(function(wordObj){
        //console.log(wordObj.shortDescription)
        res.end(wordObj.shortDescription)
      })
    break;
    case 'censor':
      let censorSentance = decodeURI(inputs.join(''));
      res.end(`${cleanUp(censorSentance)}`);
    break;

  default:
    res.statusCode = 404;
    res.end(`Option Not Found.\n`)
  }



//res.end()

});

server.listen(PORT, err=>{
  console.log(err || `Server is listening on Port ${PORT}`)
})
