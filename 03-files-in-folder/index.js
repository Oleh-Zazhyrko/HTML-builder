const path = require('path');
const fs = require('fs');

const way = path.join(__dirname + '/secret-folder');
console.log(`the way is ${way}`);

let files = fs.readdirSync(way);

files.forEach(file => {
  fs.stat(`${way}` + '/' + `${file}`, (er, result) => {
    if (er) throw er;
    if (result.isFile()) {
      console.log(file.split('.')[0] + ' - ' + file.split('.')[1] + ' - ' + (result.size/1024).toFixed(3) + 'kb');
    }
  })
});