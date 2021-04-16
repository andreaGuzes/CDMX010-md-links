const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
require('colors');

//  Obtener la ruta relativa del directorio
const relativeRoute = (route) => path.resolve(route);
//const relativeRoute = path.resolve('./files');
console.log(relativeRoute.magenta)

// Leer el directorio
const readDir = (route) => fs.readdirSync(route);
//const readDir = fs.readdirSync('./files');
console.log(readDir)

// const ruta = path.normalize(__dirname + '/files/README-DL.md');
// console.log(ruta)

// comprobar si es un archivo md
const isMdFile = (route) => path.extname(route) === '.md';
//const extension = (route) => path.extname(route);



const getLinks = (data) => {
  let expReg = /\bhttps?:\/\/\S+/gi;
  let result = data.replace(/[()]/g, '').match(expReg);
  return result;
}


let links = [];
const getMdLinksDir = () => {
  let directory = readDir('./files');
  directory.forEach(file => {
 const absoluteRoute = path.join(relativeRoute('./files'), file);
 console.log(absoluteRoute.green);
 if (isMdFile(absoluteRoute)){
   let data = fs.readFileSync(absoluteRoute, 'utf8');
   links = getLinks(data);
   console.log('path: ', absoluteRoute.cyan, 'extension: ', /*'✔'.green*/); 
   console.log('links: ', links);
   //console.log(readFile.blue);
 }
 else{
   console.log('path: ', absoluteRoute.red , 'extension: ', /*'✘'.red*/ '\nIngresa únicamente archivos .md');
 }
 return links
});
};
getMdLinksDir();

//console.log('links', links);
//  function validateLinks() {
//   let promises = links.map(item => fetch(item))
//   console.log('aqui', promises)
//   return Promise.all(promises) 
// }

const linksValidatacion = (links) => {
  /*let promises =*/ links.map(link => fetch(link)
  //return Promise.all(promises)
  .then((response) => {
   //console.log(response)
    return console.log('status'.red, { 
      href: link, status: response.status /*? 'OK' : 'rechazado'*/});
    })
  .catch((error) =>{
    console.log(error)
    return{href: url, status:'rechazado'}
  }) 
  )};

console.log(linksValidatacion(links));









// const getMdLinksDir = () => {
//        readDir.forEach(archivo => {
//       const absoluteRoute = path.join(relativeRoute, archivo);
//       console.log(absoluteRoute.green);
//       const extension = path.extname(archivo);
//       if (extension === '.md'){
//         string = fs.readFileSync(absoluteRoute, 'utf8');
//         links = fileLinks(string);
//         console.log('path: ', absoluteRoute.cyan, 'extension: ', extension.magenta, /*'✔'.green*/); 
//         console.log('links: ', links);
//         //console.log(readFile.blue);
//       }
//       else{
//         console.log('path: ', absoluteRoute.red , 'extension: ', extension.magenta,/*'✘'.red*/ '\nIngresa únicamente archivos .md');
//       }
//     });

// };
// getMdLinksDir()






//const readDir= (route) => fs.readdirSync('./files');



//  Obtener las rutas absolutas de un directorio
//readDir('./files');




// const isDirectory = (route) => fs.statSync(route).isDirectory();
// console.log(isDirectory('./files'))

// const solveToAbsolute = (route) => (path.isAbsolute(route) ? route : path.resolve(route));
// console.log(solveToAbsolute('../README-DL.md').red)






// function readFiles(string, link) {
//   let contentFile= fs.readFileSync(absoluteRoute, 'utf8');
//   getLinks(contentFile);
//   return contentFile;
// }


// const extension = path.extname(archivo);

// // console.log(readDir);

// const getLinks = () => {
//   linksCollection = string
//   .replace(/[{()}]/g, '')
//   .match(/\bhttps?:\/\/\S+/gi);
//   return linksCollection;
// }


//     readDir.forEach(archivo => {
//      // const absoluteRoute = path.join(route, archivo);
//       console.log(absoluteRoute.green);
      
//       if (extension === '.md'){
//         string = readFile
//         links = fileLinks(string);
//         console.log('path: ', absoluteRoute.cyan, 'extension: ', extension.magenta, /*'✔'.green*/); 
//         console.log('links: ', links);
//         //console.log(readFile.blue);
//       }
//       else{
//         console.log('path: ', absoluteRoute.red , 'extension: ', extension.magenta,/*'✘'.red*/ '\nIngresa únicamente archivos .md');
//       }
//       //console.log(archivo.cyan, extension.magenta);
//     });
















// const route = path.resolve('./files');

// const readDir= fs.readdirSync('./files');
// console.log(readDir);

//     readDir.forEach(archivo => {
//       const absoluteRoute = path.join(route, archivo);
//       console.log(absoluteRoute.green);
//       const extension = path.extname(archivo);
//       if (extension === '.md'){
//         const readFile = fs.readFileSync(absoluteRoute, 'utf8');
//         console.log(readFile.blue);
//       }
//       console.log(archivo.cyan, extension.magenta);
//     });

// let linksCollection = [];
// let string;

// const fileLinks = () => {
//   linksCollection = string
//   .replace(/[{()}]/g, '')
//   .match(/\bhttps?:\/\/\S+/gi);
//   return linksCollection;
// }

// const route = path.resolve('./files');

// const readDir= fs.readdirSync('./files');
// console.log(readDir);


//     readDir.forEach(archivo => {
//       const absoluteRoute = path.join(route, archivo);
//       console.log(absoluteRoute.green);
//       const extension = path.extname(archivo);
//       if (extension === '.md'){
//         string = fs.readFileSync(absoluteRoute, 'utf8');
//         links = fileLinks(string);
//         console.log('path: ', absoluteRoute.cyan, 'extension: ', extension.magenta, /*'✔'.green*/); 
//         console.log('links: ', links);
//         //console.log(readFile.blue);
//       }
//       else{
//         console.log('path: ', absoluteRoute.red , 'extension: ', extension.magenta,/*'✘'.red*/ '\nIngresa únicamente archivos .md');
//       }
//       //console.log(archivo.cyan, extension.magenta);
//     });

   




      
    
       





























// const route = path.resolve('./files');
// //console.log(route.cyan);

// fs.readdir('./files', function (err, archivos) {
//   if(err){
//     console.log(err);
//   }else {
//     archivos.forEach(archivo => {
//       const absoluteRoute = path.join(route, archivo);
//       console.log(absoluteRoute.green);
//       const extension = path.extname(archivo);
//       if (extension === '.md'){
//         fs.readFile(absoluteRoute, 'utf8', function (err, data) {
//             if(err){
//               console.log(err);
//             }else{
//             console.log(data.blue);
//             }
//           })
//       }
//       console.log(archivo.cyan, extension.magenta);
//     });
//   }
//   console.log(archivos);
// })


 


// // module.exports = () => {
// //   // ...
// // };

