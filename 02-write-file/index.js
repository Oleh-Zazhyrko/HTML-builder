const fs = require('fs');
const { Stream } = require('stream');
const { stdin, stdout } = process;
const output = fs.createWriteStream('02-write-file/text.txt');

stdout.write('Введите Ваш текст...\n');

stdin.on('data', (data, chunk) => {
  const text = data.toString();
  
  if (text.indexOf('exit') !== -1) {
    
    stdout.write('Удачи!');
    process.exit();
  } else {    
    chunk = data;
    output.write(chunk);
    stdout.write('Введите Ваш текст...\n');
  }
});