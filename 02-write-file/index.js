const fs = require('fs');
const { Stream } = require('stream');
const { stdin, stdout } = process;
const output = fs.createWriteStream('02-write-file/text.txt');


stdout.write('Введите Ваш текст...\n');
// stdin.on('data', chunk => output.write(chunk));

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




// stdin.on('data', (data) => {
//   if (data === 'exit') {
//     stdout.write('Удачи в изучении Node.js!')
//     process.exit();
//   } else {  
//     stdin.on('data', chunk => output.write(chunk));
//     stdout.write('Введите Ваш текст...\n');    
//   }  
// });






