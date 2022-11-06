const fs = require('fs');
const path = require('path');

const source = path.join(__dirname + '/styles');

fs.writeFile(
  path.join(__dirname, 'project-dist', 'bundle.css' ),  
  '//Final bundle for styles\n',
  (err) => {
    if (err) throw err;
    console.log(`File was created`);
  }
)

let files = fs.readdirSync(source);

files.forEach(file => {
  fs.stat(`${source}` + '/' + `${file}`, (err, result) => {
    if (err) throw err;
    if (result.isFile() && file.split('.')[1] !== 'css') {
      console.log(`${file} is not style file`);
    } else {      
      fs.readFile(source + '/' + file, 'utf-8', (error, data) => {
        if (error) return console.error(error.message);        
        fs.appendFile(
          path.join(__dirname, 'project-dist', 'bundle.css'),
          data,
          (err) => {
            if (err) throw err;
          }
        )
      });
    }
  })
})