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
 // return new Promise((resolve, reject) => {
  let arrLinks = links.map(link => {
    return fetch(link)
      .then((response => {
       let infObj = {
          href: link,
          text: "text",
          path: "path",
          status: response.status,
          statusText: response.statusText
        };
        return infObj
      }))
      .catch((err) => {
       // console.log(err)
       let mistake = {          
          url:link,
          error:err.code,
          status:err.status,
      }
      return mistake;
      });
    })
      Promise.all(arrLinks)
      .then((response) => console.log((response)))
      .catch(() =>{
        //reject ('No se obtuvo la información')
     // })
    })
}

// const validateLinks = (links) => {
//   return new Promise((resolve, reject) => {
//   let arrLinks = links.map(link => {
//     return fetch(link.href)
//       .then(result => {
//        link.status = console.log(result.status);
//        link.access = result.status === 200 ? 'ok' : 'fail';
//        console.log(link.access)
//       })
//       .catch((err) => console.log(err))
//     })
//       Promise.all(arrLinks)
//       .then(() => resolve(links))
//       .catch(() =>{
//         reject ('No se obtuvo la información')
//       })
//     })
// }


//Estadisticas de TOTAL y UNIQUES -> totalStats() 
const totalStats = linksCollection => { 
  let allLinks = linksCollection.map(link => link.href);   
  const totalLinks = allLinks.length;     
  const uniqueLinks = [...new Set(linksCollection)].length; 
  let statsResult = {
    total: totalLinks,
    unique: uniqueLinks,
    };
  console.log(statsResult);
};

const statsAndValidate = (links) => {
  let resultOkLinks = 0;        
  let resultFailLinks = 0; 
  let brokenLinks = [];
  let okLinks = [];  
  let promises = links.map(link =>fetch(link)
      .then((response) => {
       let infObj = {
          href: link,
          text: "text",
          path: "path",
          status: response.status,
          statusText: response.statusText
        };
        if (infObj.status === 200){
          okLinks.push(infObj)
          return (resultOkLinks++)
      }
      if (infObj.status !== 200){
        brokenLinks.push(infObj)
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
          brokenLinks.push(mistake)
          return resultFailLinks++
      }
      }));
  return Promise.all(promises)
  .then(results => (console.log({
    Total: results.length,
    //Unique: resultOkLinks + resultFailLinks,
    OK : resultOkLinks,
    Broken: resultFailLinks,
  }))
  )
};



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
    // .then((response) => {
    //   console.log('AQUI....................', response)
    // })
  } else if (option == '--v') {
    validateLinks(links)
  } else if (option == '--s') {
     totalStats(links);
  } else if(option == '--stats') {
   totalStats(links);
  } else if(option == '--stats --validate') {
    statsAndValidate(links)
  } else {
    console.log(links);
  }
});
}


main('./files', options);
