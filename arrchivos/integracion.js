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

const validateLinks = (files, absolutePath) => {
    const linksMd = readFiles(files, absolutePath)
    console.log('QUE SALE>>>>>>>',linksMd)
  let arrLinks = linksMd.map(link => {
    return fetch(link)
      .then((response) => {
       let infoLink = {
          href: link,
          text: "text",
          path: "path",
          status: response.status,
          statusText: response.statusText
        };
       if (response.status >= 200 && response.status < 404 ) {
           infoLink.status = response.status;
           infoLink.message = response.statusText;
           return(console.log('AQUI...........', infoLink))
       } else {
           infoLink.status = response.status;
           infoLink.message = 'Fail'
           return(infoLink);
       }
      })
      .catch((err) => {
        let infoMistakeLink = {          
           url:link,
           error:err.code,
           status:err.status,
       }
      })
    });
   Promise.all(arrLinks)
   .then(response => console.log(response))
   .catch(err => console.log(err))
}

// const getLinksStats = (links) => new Promise((resolve) => {
//     validate(path)
//       .then((response) => {
//         let totalLinks = response.length;
//         let uniqueLinks = [...new Set(response.map((response) => response.href))].length;
//         resolve(`Total : ${totalLinks} Unique: ${uniqueLinks}`);
//       });
//   });

//   const getBrokenLinksStats = (path) => new Promise((resolve) => {
//     validate(path)
//       .then((response) => {
//         const brokenLinks = response.filter((element) => element.message === 'Fail').length;
//         resolve(`Broken: ${brokenLinks}`);
//       });
//   });


  


//   const statsBrokenLinks = (arrLinks) => {
//     //links = arrayMocks 
//      //.then((links) => {
//          let brokenLinks = [];
//          let okLinks = []; 
//          arrLinks.forEach((link)=>{
//              if (link.status !== 200){
//                  brokenLinks.push(link.status)
//              }
//              else {
//                  okLinks.push(link.status)
//              }
//          })
//          console.log('Broken:', brokenLinks.length)
     //})
     //.catch((err) => console.log(err))  


// const options = {
//   one: process.argv[2],
//   two: process.argv[3]
// }

function main (/*file, options*/) {
  const ruteAbsolute = path.resolve('./files'/*file*/);
  const files = fs.readdirSync('./files'/*file*/);
  const links = readFiles(files, ruteAbsolute);

  validateLinks(files, ruteAbsolute);


// const option = [];
// if (options.two == undefined) {
//     option.push(options.one)
// } else if(options.two !== undefined){
//     option.push(options.one +" "+ options.two)
// };

// option.forEach(option => {
//   if (option == '--validate') {
  //  validateLinks(links)
   //statsBrokenLinks(links);
//   } else if (option == '--v') {
//     validateLinks(links)
//   } else if (option == '--s') {
  //  totalStats(links);
//   } else if(option == '--stats') {
//     totalStats(links);
//   } else if(option == '--stats --validate') {
//     totalStats(links)
    // statsBrokenLinks(links)
  //  validateLinks(links)
//   } else {
//     console.log(links);
  }
// });
// }


main(/*'./files', options*/);
