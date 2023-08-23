//const chalk = require('chalk');
const { routAbsolute, routExists, isDirectory, readFilesMD, extractLinks, createObjects  } = require ("./funciones.js");


//************************ PROMESA  *******************/

const mdlinks = (route, options) => {
  return new Promise ((resolve, reject) => {
    const ifExists = routExists(route);
    if (ifExists) {
    routAbsolute(route);

    const mdFiles = isDirectory(route);
    const readfilesMd = readFilesMD(mdFiles); 
    const linksArray = extractLinks(readfilesMd);
    const createObjectsa = createObjects(linksArray, route);
    
    resolve(createObjectsa)
     
    }  else {
      console.log('La ruta ingresada no es valida');
    }
  })

}



//************************ PRUEBA  *******************/


mdlinks("../prueba")
.then(prueba => {

  console.log('Ruta Encontrada:', prueba);

})
.catch(error => {
  console.log(error)
});

module.exports = {mdlinks};