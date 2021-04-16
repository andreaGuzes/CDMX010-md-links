const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
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

// const validateLinks = (links) => {
//     let allinks = links.map((link) => {
//       fetch(link)
//         .then((response) => {
//           let validate = {
//             href: link,
//             text: "text",
//             path: "path",
//             status: response.status,
//             statusText: response.statusText
//           };
//           return console.log((validate));
//         })
//         .catch((err) => {
//           validate = {
//             href: err.link,
//             text: "text",
//             path: "path",
//             status: response.status,
//             statusText: response.statusText,
//           };
//           return validate;
//         });
//     });
//     return Promise.all(allinks)
//     .then((newresponse) => {
//       return newresponse;
//     });
//   };

// function validLinks(links) {
//   let i = 0;
//   let work = 0;
//   let broke = 0;
//   for( i = 0; i <links.length; i++){
//       fetch(links[i]).then(function(response) {
//           if (response.status === 200) {
//               work ++;
//           }else if (response.status == 404) {
//               broke ++;
//           }else {
//               console.log('error', response.status);
//             }
//           console.log(`✔ Total Links: ${links.length}`.brightYellow);
//           console.log(`✔ Total work Links: ${work}`.green);
//           console.log(`✖ Total Broken links: ${broke}`.red);
//       })
//   };
// };

// const validateLinks = (links) => {
//   let allinks = links.map((link) => {
//     fetch(link)
//       .then((response) => {
//         let validate = {
//           href: link,
//           text: "text",
//           path: "path",
//           status: response.status,
//           statusText: response.statusText
//         };
//         return console.log((validate));
//       })
//       .catch((err) => {
//         validate = {
//           href: err.link,
//           text: "text",
//           path: "path",
//           status: response.status,
//           statusText: response.statusText,
//         };
//         return validate;
//       });
//   });
//   return Promise.all(allinks)
//   .then((newresponse) => newresponse);
// };


let infObj = [];
let okLinks = []; 
let mistake = [];
let brokenLinks = []; 

const validateLinks = (links) => {
  let resultOkLinks = 0;        
  let resultFailLinks = 0; 
  let promises = links.map(link =>fetch(link)
      .then((response) => {
        infObj = {
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
      if (infObj.status === 404){
        brokenLinks.push(infObj)
        return  (resultFailLinks++)
    }
        //return console.log((validate));
      })
      .catch((err) => {
        mistake = {          
          url:link,
          error:err.code,
          status:err.status,
      }
      // if (mistake.status === 404){
      //     brokenLinks.push(mistake)
      //     return resultFailLinks++
      // }
      }));
  return Promise.all(promises)
  .then(results => (console.log({
    Total: results.length,
    Unique: resultOkLinks + resultFailLinks,
    //OK : resultOkLinks,
    Broken: resultFailLinks,
  }))
  )
};

//Estadisticas de TOTAL y UNIQUES -> totalStats() 
const totalStats = linksCollection => { 
  // i.v. no va a trabajar con promesas, si la de md links   
  let allLinks = linksCollection.map(link => link.href);  // async para cuando no quiero detener el flujo de ejecucion     
  const totalLinks = allLinks.length;  // la calculacion de los stats es sincrono      
  const uniqueLinks = [...new Set(linksCollection)].length; //--> solo tiene una lista de elementos unicos, hacer un bucle que va a reducir un array y compara elementos     
  //const brokenLinks = linksCollection.map(link => link.status);
  let statsResult = {
    total: totalLinks,
    unique: uniqueLinks,
    //broken: brokenLinks.length
    };     
  console.log(statsResult); 
};


function main () {
  const ruteAbsolute = path.resolve('./files');
  const files = fs.readdirSync('./files');
  const links = readFiles(files, ruteAbsolute);
  console.log(links);
  validateLinks(links);
  totalStats(links);
  //stats(links);
  //validateAndStats(links);
  //statusLink(links);
  
  //validLinks(links)
}
main();

