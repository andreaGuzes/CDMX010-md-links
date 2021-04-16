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

const fileLinks = (data) => {
  let linksCollection = [];
  let regExp = /\bhttps?:\/\/\S+/gi;
  linksCollection = data
  .replace(/[()]/g, '')
  .match(regExp);
  return linksCollection;
};

const statsAndValidate = (links) => {
    let resultOkLinks = 0;        
    let resultFailLinks = 0; 
    // let brokenLinks = [];
    // let okLinks = [];  
    let arrLinks = links.map(link =>
        fetch(link)
        .then((response) => {
         let infObj = {
            href: link,
            text: "text",
            path: "path",
            status: response.status,
            statusText: response.statusText
          };
          if (infObj.status === 200){
            //okLinks.push(infObj)
            return console.log((resultOkLinks++))
        }
        if (infObj.status !== 200){
          //brokenLinks.push(infObj)
          return  (resultFailLinks++)
      }
          //return console.log((validate));
        })
        .catch((err) => {
          //console.log(err)
          let mistake = {          
            url:link,
            error:err.code,
            status:err.status,
        }
        if (mistake.status !== 200){
            //brokenLinks.push(mistake)
            return resultFailLinks++
        }
        }));
    return Promise.all(arrLinks)
    //.then(response => (console.log(response)))
        //{
    //   Total: results.length,
    //   //Unique: resultOkLinks + resultFailLinks,
    //   OK : resultOkLinks,
    //   Broken: resultFailLinks,
    // }))
    //)
  };

  function main (/*file, options*/) {
    const ruteAbsolute = path.resolve('./files'/*file*/);
    const files = fs.readdirSync('./files'/*file*/);
    const links = readFiles(files, ruteAbsolute);
    statsAndValidate(links)
  
  }
  
  
  main(/*'./files', options*/); 