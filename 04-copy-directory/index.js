const fs = require('fs');
const fsProm = fs.promises;
const path = require('path');

const source = path.join(__dirname + '/files');
const target = path.join(__dirname + '/files-copy');

async function checkFolder() {
  await fsProm.mkdir(target, { recursive: false }).then(() => {
    console.log(`Папка 'files-copy' была создана`);
    copyDir();
  }).catch(() => {
    console.log('Папка уже существует');
    copyDir();
  });
}


async function copyDir() {
  await deleteDir();
  await fsProm.readdir(source)
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

async function deleteDir() {

  await fs.readdir(target, (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlink(path.join(target, file), (err) => {
        if (err) throw err;
      });
    }
  });

  // await fs.rmdir(target, (err) => {
  //   if (err) throw err;
  //   console.log('Folder was deleted');
  // });
}

checkFolder();