const fs = require ('fs');  // File System Nos ayuda a trabajar con archivos y directorios 
const path = require ('path'); 
const axios = require ('axios'); 

//Funcion que validar si la ruta existe o no existe //

function routExists(route) {
return fs.existsSync(route) 
};


//Funcion para transformar ruta relativa a ruta absoluta// 
function routAbsolute(route) {
    if (path.isAbsolute(route)) {
        return route; 
    } else {
        return path.resolve(route); 
    }
} 


//Funcion para validar si la ruta es un directorio//

function isDirectory(route) {
  const stats = fs.statSync(route); 
  if (stats.isFile()){
    return [route]; 
    
  } else if (stats.isDirectory()){
    let arrayF = []; 
    const files = fs.readdirSync(route); 

    files.forEach((file) => {
      const newRoute = path.join(route, file); 
      const stateNew = fs.statSync(newRoute); 
      if(stateNew.isFile()){
        arrayF.push(newRoute); 
      } else if (stateNew.isDirectory()) {
        arrayF = arrayF.concat(isDirectory(newRoute));
      }
    }); 
    return arrayF.filter(file => path.extname(file) == '.md'); 
  }
  return []; 
} 

// funcion para leer el contenido de los archivos 

function readFilesMD(route) {
  const contentArray = []; 

  route.forEach((pathFile) => {
    const content = fs.readFileSync(pathFile, 'utf-8'); 
    contentArray.push({filePath: pathFile, content: content}); 
  }); 
  return contentArray; 
}
// funcion para obtener los links a partir del contenido y retornar un objeto 

function extractLinks(arr) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const linksArray = []; 

  arr.forEach((file) => {
    const matches = file.content.match(linkRegex); 
    if (matches) {
      matches.forEach((linkMatch) => {
        const objectmatch = linkMatch.match(/\[([^\]]+)\]\(([^)]+)\)/); 
        const text = objectmatch[1];
        const link = objectmatch[2]; 
        linksArray.push({
          file: file.filePath, 
          href: link, 
          text: text,
        })
      })
    }
  }); 
  return linksArray; 
}

//Funcion de axios para retornar el status y el mensaje (el status del link)

function askForAxiosHTTP(linksArrays) {
  const arrayPromisses = linksArrays.map((item) => {
    return axios
    .get(item.href)
    .then((response) => {
      item.status = response.status 
      item.mensaje = response.statusText
      return item
    })
    .catch((err) => {
      if (err.response){
        item.status = err.response.status
        item.mensaje = err.response.statusText
      } else {
        item.status = 404
        item.mensaje = 'Not found'
      }
      return item
    })
  })
  return Promise.all(arrayPromisses); 
  
}

//Funcion que retorna las estadisticas de los links 

function uniqueLinks(array) {
  const uniqueLinkSet = new Set(); 
  array.forEach(item => uniqueLinkSet.add(item.href)); 
  return {
    total: array.length, 
    unique: uniqueLinkSet.size
  };
}


// Funcion para incluir a las estadisticas los enlaces rotos 

function stadisticsBroken(array) {
  const uniqueLinkSet = new Set(); 
  array.forEach(item => uniqueLinkSet.add(item.href)); 
  const brokeLinks = array.filter(item => item.status === 404);
  return {
    total: array.length, 
    unique: uniqueLinkSet.size, // Usar el tamaño del Set en lugar del arreglo
    broken: brokeLinks.length
  };
}

 module.exports = {routAbsolute, routExists, isDirectory, readFilesMD, extractLinks, askForAxiosHTTP, uniqueLinks, stadisticsBroken}; 

