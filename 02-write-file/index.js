const fs = require('fs');
const { stdin, stdout } = process;
const output = fs.createWriteStream('02-write-file/text.txt');
var tty = require("tty");

stdout.write('Введите Ваш текст...\n');

stdin.on('data', (data, chunk) => {
  const text = data.toString();
  
  if (text.indexOf('exit') !== -1) {
    
    stdout.write('Удачи!');
    process.exit();
  } else if (typeof(text) === 'string' && text.indexOf('exit') === -1){
    chunk = data;
    output.write(chunk);
    stdout.write('Введите Ваш текст...\n');
  } else {
    stdout.write('Удачи!');
    process.exit();
  }
});

