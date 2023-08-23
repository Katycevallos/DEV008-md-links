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

  route.forEach((route) => {
    const content = fs.readFileSync(route, 'utf-8'); 
    contentArray.push(content); 
  }); 
  return contentArray; 
}
// funcion para obtener los links a partir del contenido 

function extractLinks(arr) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const linksArray = []

  arr.forEach((text) => {
    const matches = text.match(linkRegex); 
    if (matches) {
      linksArray.push(...matches); 
    }
  }); 
  return linksArray; 
}


// funcion que genere el objeto con el link, texto y path 

function createObjects(linksArray, route) {
  const linksObjects = []; 
linksArray.forEach((link) => {
  const linksRegex = /\[([^\]]+)\]\(([^)]+)\)/;
  const match = link.match(linksRegex); 

  if(match) {
    const text = match[1]; 
    const href = match[2]; 

    linksObjects.push({
      text,
      href,
      file: routAbsolute(route) 
    }); 
    }
}); 
return linksObjects; 
}

// function readLinks(array) {
//   //console.log(array);
//   const links = []; //Se crea un array vacio que guardara todos los links 
//   const regex = /\[.+?\]\(.+?\)/g; //patrones de texto en formato md de la forma [texto](URL) 
//   array.forEach((link) => { 
//     const found = link.match(regex); //Devuelve las coincidencias encontradas 
//     if(found){ 
//       links.push(...found); //Se agregan los links y se usa la sintaxis spread para tomar como elementos separados
//     } // crea un objeto donde el links.push({
//       //href: link primera posicion que me devuelve el arreglo, texto la segunda posicion, ruta la tercera posicion (path)
//     //})
//   }); 
//  // console.log(links); 
//   return links; 
// }

//Funcion para verificar el false // 

//Recorra el array que traigo y traiga el Axios
// function falseLinks(links) {
//   const linksFalse = []; //Array vacio para guardar los enlaces con la especificacion 
//   links.forEach((link) => {
//     let rout = path.resolve(); // Se obtiene la ruta actual del sistema 
//     if(link.match(/\[.+?\]\(.+?\)/g)){ // Se verifica si el enlace cumple con el patron entre corchetes y luego parentesis
//       let linkFalse = link.match(/\[.+?\]\(.+?\)/g); // Si cumple con la condicion se almacena en la constante linkFalse
//     //  console.log(linkFalse); 
//       const pathObject = { // Se crea un objeto 
//         href: linkFalse[0].match(/https*?:([^"')\s]+)/),
//         text: linkFalse[0].match(/\[(.*?)\]/)[1],
//         file: rout,
//       } ; 
//       //console.log(linkFalse); 
//       linksFalse.push(pathObject);// Si cumple con lo especificado anteriormente se agrega al objeto pathObject 
//     }
//   });
  
//   return linksFalse; 
// }

// // Funcion de AXIOS //

// function askForHTTP(arrObjs) { //Toma una matriz de objetos 
//   const promisesArray = arrObjs.map((obj)=> {
//     return axios 
//     .get(obj.href) // Se utiliza la biblioteca axios para realizar una solicitud de HTTP 
//     .then((response)=> { //Si la solicitud es exitosa, el bloque se ejecuta con el objeto de respuesta 
//       return {
//         ...obj,
//         status: response.status, // Se agrega la propiedad status al objeto actual con el codigo de estado HTTP de la respuesta 
//         mensaje: response.data
//       }
//     })
//     .catch ((err)=> {
//       return {
//         ...obj,
//         mensaje: 'Fail',
//         status: err.response && err.response.status ? err.response.status : undefined //Agrega la propiedad status 
//         //al objeto actual con el código de estado de la respuesta de error si está disponible en err.response, 
//         //de lo contrario, se establece como undefined.
//       }
//     });
//   });
  
//   return Promise.all(promisesArray)
  
// }

// //Funcion para visualizar las estadisticas de los links // 

// function validateStatsLinks(arrObjs, isOptionValidate) {
//   return new Promise((resolve) => {
//     const allStatus = { // Crea un objeto para almacenar las estadisticas
//       total: arrObjs.length, // Almacena la longiitud de la matriz de objetos de enlaces, total de enlaces
//       unique: new Set(arrObjs.map((link) => link.href)).size, // Numero de enlaces unicos
//     }
//     if(isOptionValidate){
//       allStatus.working = arrObjs.filter(obj => obj.mensaje == 'OK').length; 
//       allStatus.broken = arrObjs.filter(obj => obj.mensaje == 'Fail').length; 
//     }
//     resolve(allStatus); 
//   })
// } 

 module.exports = {routAbsolute, routExists, isDirectory, readFilesMD, extractLinks, createObjects}; 

