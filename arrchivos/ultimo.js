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

const validateLinks = (links) => {
  let arrLinks = links.map(link => {
      return fetch(link)
      .then((response) => {
       let infoLink = {
          href: link,
          text: "text",
          path: "path",
          status: response.status,
          statusText: response.statusText
        };
        return infoLink
      })
      .catch((err) => {
       let infoMistakeLink = {          
          url:link,
          error:err.code,
          status:err.status,
      }
      return infoMistakeLink;
      })
      })
  let promises = Promise.all(arrLinks)
// .then(response => totalStats(response))
// .catch(err => console.log(err))
// promises.then(response => totalStats(response))
// .catch(err => console.log(err))

promises.then(response => /*console.log(*/statsBrokenLinks(response))
.catch(err => console.log(err))
};

const totalStats = (arrLinks) => { 
    const totalLinks = arrLinks
    const uniqueLinks = [...new Set(totalLinks)].length; 
    let statsResult = {
      total: totalLinks.length,
      unique: uniqueLinks,
      };
    console.log(statsResult);
  
}

  const statsBrokenLinks = (arrLinks) => {
    //links = arrayMocks 
     //.then((links) => {
         let brokenLinks = [];
         let okLinks = []; 
         arrLinks.forEach((link)=>{
             if (link.status !== 200){
                 brokenLinks.push(link.status)
             }
             else {
                 okLinks.push(link.status)
             }
         })
         console.log('Broken:', brokenLinks.length)
     //})
     //.catch((err) => console.log(err))  
 }

const options = {
  one: process.argv[2],
  two: process.argv[3]
}

function main (file, options) {
  const ruteAbsolute = path.resolve(/*'./files'*/file);
  const files = fs.readdirSync(/*'./files'*/file);
  const links = readFiles(files, ruteAbsolute);


const option = [];
if (options.two == undefined) {
    option.push(options.one)
} else if(options.two !== undefined){
    option.push(options.one +" "+ options.two)
};

option.forEach(option => {
  if (option == '--validate') {
    validateLinks(links)
   //statsBrokenLinks(links);
  } else if (option == '--v') {
    validateLinks(links)
  } else if (option == '--s') {
    totalStats(links);
  } else if(option == '--stats') {
    totalStats(links);
  } else if(option == '--stats --validate') {
    totalStats(links)
    // statsBrokenLinks(links)
    validateLinks(links)
  } else {
    console.log(links);
  }
});
}


main('./files', options);
