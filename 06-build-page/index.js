const fs = require('fs');
const fsProm = fs.promises;
const path = require('path');
require('colors');

console.log("Start\n".yellow);

//Bundle index.html
const source = path.join(__dirname + '/components');
const target = path.join(__dirname + '/project-dist');

fs.readFile(
    path.join(__dirname, 'template.html'),
    'utf-8',
    (error, dataTemplate) => {
      if (error) throw error;

      makeDir(target);

      fs.readdir(source, (err, files) => {
        if (err)
          console.log(err);
        else {
          files.forEach(file => {
            fs.readFile(
            path.join(__dirname, 'components', file),
            'utf-8',
            (error, data) => {
              if (error) throw error;
              dataTemplate = dataTemplate.replace(`{{${file.split('.')[0]}}}`, data);
            }
          )
          })
        }
      })

      setTimeout(() => fs.writeFile(
        path.join(target, 'index.html'),
        dataTemplate,
        (err) => {
            if (err) throw err;
            console.log('File index.html was written'.green);
        }
    ), 1000)
  });

//Bundle styles

const sourceCss = path.join(__dirname + '/styles');

fs.writeFile(
  path.join(__dirname, 'project-dist', 'style.css' ),
  '//Final bundle for styles\n',
  (err) => {
    if (err) {
      console.log('File css is already exist'.red);
    } else {
      console.log(`File css was written`.green);
    }
  }
)

fs.readdir(sourceCss, (err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      fs.stat(`${sourceCss}` + '/' + `${file}`, (err, result) => {
        if (err) throw err;
        if (result.isFile() && file.split('.')[1] !== 'css') {
          console.log(`${file} is not style file`);
        } else {      
          fs.readFile(sourceCss + '/' + file, 'utf-8', (error, data) => {
            if (error) return console.error(error.message);
            fs.appendFile(
              path.join(__dirname, 'project-dist', 'style.css'),
              data,
              (err) => {
                if (err) throw err;
              }
            )
          });
        }
      })
    })
  }
})

// Copy assets folder

const sourceFolder = path.join(__dirname + '/assets');
const targetFolder = path.join(__dirname + '/project-dist/assets');

fs.mkdir(
  targetFolder,
  err => {
    if (err) {
      console.log(`Directory /assets is already exist`.red);
    } else {
      console.log(`Directory /assets created successfully!`.green);
    }

    fs.readdir(__dirname + '/assets', (err, files) => {
      if (err)
        console.log(err);
      else {
        console.log("\nCurrent directory filenames:");
        files.forEach(file => {
          console.log(file);
          makeDir(path.join(targetFolder + `/` + file));
          copyDir(sourceFolder + `/` + file, targetFolder + `/` + file);
        })
      }
    })
  }
)

function makeDir(targetDir) {
  fs.mkdir(
    targetDir,
    err => {
      if (err) {
        console.log(`Directory ${targetDir} is already exist`.red);
      } else {
        console.log(`Directory ${targetDir} created successfully!`.green);        
      }
    }
  )
}

function copyDir(source, target) {
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

