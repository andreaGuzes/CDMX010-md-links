const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const process = require('process');
const { resolve } = require('path');
const cliCommand = process.argv;
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


// let infObj = [];
// let okLinks = []; 
// let mistake = [];
// let brokenLinks = []; 

// const validateLinks = (links) => {
//   let resultOkLinks = 0;        
//   let resultFailLinks = 0; 
//   let promises = links.map(link =>fetch(link)
//       .then((response) => {
//         infObj = {
//           href: link,
//           text: "text",
//           path: "path",
//           status: response.status,
//           statusText: response.statusText
//         };
//         if (infObj.status === 200){
//           okLinks.push(infObj)
//           return (resultOkLinks++)
//       }
//       if (infObj.status === 404){
//         brokenLinks.push(infObj)
//         return  (resultFailLinks++)
//     }
//         //return console.log((validate));
//       })
//       .catch((err) => {
//         //console.log(err)
//         mistake = {          
//           url:link,
//           error:err.code,
//           status:err.status,
//       }
//       // if (mistake.status === 404){
//       //     brokenLinks.push(mistake)
//       //     return resultFailLinks++
//       // }
//       }));
//   return Promise.all(promises)
//   .then(results => ({
//     Total: results.length,
//     Unique: resultOkLinks + resultFailLinks,
//     //OK : resultOkLinks,
//     Broken: resultFailLinks,
//   })
//   )
// };

//let infObj = [];
let okLinks = []; 
//let mistake = [];
let brokenLinks = []; 

const validateLinks = (links) => {
  let promises = links.map(link => fetch(link)
      .then((response) => {
       let infObj = {
          href: link,
          text: "text",
          path: "path",
          status: response.status,
          statusText: response.statusText
        };
        console.log(infObj);
      })
      .catch((err) => {
       let mistake = {          
          url:link,
          error:err.code,
          status:err.status,
      }
      console.log(mistake);
      }));
  return Promise.all(promises)
//   .then(results => (console.log('AQUI AlGO', {
//     Total: results.length,
//     //Unique: resultOkLinks + resultFailLinks,
//     // //OK : resultOkLinks,
//     // Broken: resultFailLinks,
//   }))
//   )
};

// const validateAndStats = 
// .then(() =>{
//     let resultOkLinks = 0;
//     let resultFailLinks = 0;
//     let okLinks = [];
//     let brokenLinks = [];
// if (infObj.status === 200){
//     okLinks.push(infObj)
//     return (resultOkLinks++)
// }
// if (infObj.status === 404){
//   brokenLinks.push(infObj)
//   return  (resultFailLinks++)
// }
// })
// .catch((err) => {
//    console.log(err)
//    });


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

// const options = {
//   one: process.argv[2],
//   two: process.argv[3]
// }

function main () {
  const ruteAbsolute = path.resolve('./files');
  const files = fs.readdirSync('./files');
  const links = readFiles(files, ruteAbsolute);
  //console.log(links);
  validateLinks(links);
  totalStats(links);


// const option = [];
// if (options.two == undefined) {
//     option.push(options.one)
// } else if(options.two !== undefined){
//     option.push(options.one +" "+ options.two)
// };

// option.forEach(option => {
//   if (option == '--validate') {
//     //linksValidatacion(links)
//   } else if (option == '--v') {
//     //linksValidatacion(links)
//   } else if (option == '--s') {
//     totalStats(links);
//   } else if(option == '--stats') {
//     totalStats(links);
//   } else if(option == '--stats --validate') {
//     //DEBERIAN SER LOS ROTOS  como totalStats(links) pero incluyendo los rotos
//   } else {
//     console.log(links);
//   }
// });
}


main();


// main()
// .then((result) => {    
//   if (options.includes('--validate') && options.includes('--stats')) {
//       console.log(result)
//       console.log("OK Links:", infObj)
//       console.log("Broken Links:", broken)
//   }else if(options.includes('--validate')){       
//       console.log("OK Links:", infObj)
//       console.log("Broken Links:", broken)
//   } else if(options.includes ('--stats')){
//       console.log(result)
//   }       
// })
// .catch(e=> {
//   console.log(e)
// });;