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


let linkok =[];
let okLinks = []; 
let blink=[];
let broken = []; 


function statusLink(links) {    
  let i=0        
  let j=0  
  let promises =links.map( link =>fetch(link)
      .then(res=> { 
          linkok = {
              href:res.url,
              statusText:res.statusText,
              status:res.status,                                    
          }
          if (linkok.status===200){
              okLinks.push(linkok)
              return (i++)
          }
          if (linkok.status!==200){
              broken.push(linkok)
              return  (j++)
          } 
      })
      .catch(err=>{          
          blink={          
              url:link,
              error:err.code,
              status:err.status,
          }
          if (blink.status!==200){
              broken.push(blink)
              return j++
          }
      }))
      return Promise.all(promises) 
      .then(results => (console.log({
            Total: results.length,
            Ok: i,
            Broken: j,            
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
  //validateLinks(links);
  totalStats(links);
  //stats(links);
  //validateAndStats(links);
  statusLink(links);
  
  //validLinks(links)
}
main();
