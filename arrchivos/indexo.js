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
   console.log('path: ', absoluteRouteFile.cyan, /*'✔'.green*/); 
   console.log('links: ', links);
   //console.log(readFile.blue);
 }
 else{
   console.log('path: ', absoluteRouteFile.red, /*'✘'.red*/ '\nIngresa únicamente archivos .md');
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

const linksAndStatus = (promises) => {
  Promise.all(promises)
  .then((result => {
    result.map((res) =>{
      if(res.status === 200){
       console.log(res.href);
      } else {
        console.log(res.href);
      }
    })
  }))
}

const linkStats = (promises) => {
  let resultOkLinks = 0;        
  let resultFailLinks = 0; 
  Promise.all(promises)
  .then((result) => {
    const totalLinks = result.length
    // let brokenLinks = [];
    // let okLinks = []; 
    // let resultOkLinks = 0;        
    // let resultFailLinks = 0; 
      result.map((result) => {
        //console.log('AQUI .........', result)
        if (result.status === 'OK'){
          //okLinks.push(result)
          return (resultOkLinks++)
      }
      if (result.status !== 'FAIL'){
        //brokenLinks.push(result)
        return  (resultFailLinks++) 
    }
        else{
          console.log(result.href.red, result.status)
        }
      })
    })
    .catch((err) =>{
      let mistake = {          
        url:link,
        error:err.code,
        status:err.status,
      }
    })
  };


const validateLink = (link) => 
  fetch(link)
  .then((response) => {
    return {href: link, status: response.ok ? 'OK' : 'FAIL'};
  })
  .catch((err) => {
    return {href: link, status:'FAIL'};
  })


//Estadisticas de TOTAL y UNIQUES -> totalStats() 
const totalStats = linksCollection => {   
  let allLinks = linksCollection.map(link => link.href);  // async para cuando no quiero detener el flujo de ejecucion     
  const totalLinks = allLinks.length;  // la calculacion de los stats es sincrono      
  const uniqueLinks = [...new Set(linksCollection)].length; //--> solo tiene una lista de elementos unicos, hacer un bucle que va a reducir un array y compara elementos     
  let statsResult = {
    total: totalLinks,
    unique: uniqueLinks,
    };     
  console.log(statsResult); 
};


function main () {
  const ruteAbsolute = path.resolve('./files');
  const files = fs.readdirSync('./files');
  const links = readFiles(files, ruteAbsolute);
  console.log(links);
  const promises = links.map((link) => validateLink(link)) 
  //console.log('AQUI PROMISES..........', promises);
  linksAndStatus(promises);
  linkStats(promises);
  totalStats(links);
}
main()



