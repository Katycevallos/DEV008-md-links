const chalk = require('chalk');
const { routAbsolute, routExists, isDirectory, readFilesMD, extractLinks, askForAxiosHTTP, uniqueLinks, stadisticsBroken } = require("./funciones.js");


//************************ PROMESA  *******************/

const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    const ifExists = routExists(route);
    if (ifExists === true) {
      const routeAbsolute1 = routAbsolute(route);
      //console.log(routeAbsolute1);
      const mdFiles = isDirectory(routeAbsolute1);
      //console.log(mdFiles); 

      const readfilesMd = readFilesMD(mdFiles);
      //resolve(readfilesMd)

      if (readfilesMd.length === 0) {
        reject('No existen archivos con extensión .md')
      } 
      const linksArray = extractLinks(readfilesMd);
      //stats false validate false file, ref, text 
      if (options.validate === false && options.stats === false) {
        resolve(linksArray)
      }
      // //stats true validate false (total link y links unicos)
      const statistics = uniqueLinks(linksArray);
      if (options.validate === false && options.stats === true) {
        resolve(statistics)
      }
      // //stats true validate true (total unicos rotos)

      if (options.validate === true && options.stats === true) {
        askForAxiosHTTP(linksArray)
        .then((response) => {
          resolve(stadisticsBroken(response))
        })
      }
      // // resolve(readContentHTPP href, text, link, status, mensaje) // validate es true stats es false 
      if (options.validate === true && options.stats === false) {
        const readContentHTPP = askForAxiosHTTP(linksArray);
        readContentHTPP.then((response) => {
          resolve(response)
        })

      } 
    } else {
      reject('La ruta ingresada no es valida')
    }
  });
}



//************************ PRUEBA  *******************/


// mdLinks("../prueba", {validate: true, stats: true})
//   .then(prueba => {

//     console.log(( prueba));
//     // console.log(chalk.red('unique:', prueba.unique));
//     // console.log(chalk.red('broken:', prueba.broke));
//   })
//   .catch(error => {
//     console.log(error)
//   });

module.exports = { mdLinks };