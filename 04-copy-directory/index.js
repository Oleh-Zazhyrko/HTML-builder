const fs = require('fs');
const fsProm = fs.promises;
const path = require('path');

const source = path.join(__dirname + '/files');
const target = path.join(__dirname + '/files-copy');

fsProm.mkdir(target, { recursive: false }).then(() => {
  console.log(`Папка 'files-copy' была создана`);
  copyDir();
}).catch(() => {
  console.log('Папка уже существует');
  copyDir();
});

function copyDir() {
  fsProm.readdir(source)
  .then(files => {
    for (let file of files) {
      fsProm.copyFile(source + '/' + file, target + '/' + file);
      console.log(`${file} скопирован успешно`);
    }
  })
  .catch(err => {
    console.log(err);
  })
}