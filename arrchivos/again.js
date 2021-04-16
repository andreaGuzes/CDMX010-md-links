const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const process = require('process');
require('colors');


function readFiles(files, absolutePath){
    let links = [];
    files.forEach(file => {
    const absoluteRouteFile = path.join(absolutePath, file);
    const extension = path.extname(absoluteRouteFile);
    if (extension === '.md'){
      let data = fs.readFileSync(absoluteRouteFile, 'utf8');
      const newLinks = fileLinks(data);
      links = links.concat(newLinks);
      //console.log('path: ', absoluteRouteFile.cyan, '✔'.green); 
      //console.log('links: ', links);
      //console.log(readFile.blue);
    }
    else{
     // console.log('path: ', absoluteRouteFile.red, '✘'.red*/ '\nIngresa únicamente archivos .md');
    }
   });
   return links
   };
