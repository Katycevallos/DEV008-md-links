//const mdLinks = require('../src/funciones');
const { routAbsolute, routExists, isDirectory, readFilesMD, extractLinks, askForAxiosHTTP, uniqueLinks, stadisticsBroken } = require ("../src/funciones");
const path = require ('path'); 

//Funcion routAbsolute //
describe('Test routAbsolute', ()=> {
  it('deberia ser una funcion', ()=> {
    expect(typeof routAbsolute).toBe('function'); 
  }); 
  it('retorna una ruta absoluta', async () => {
    const absolute = path.resolve('./prueba')
    expect(routAbsolute('./prueba')).toBe(absolute)
  });
  it('retorna la misma ruta si es una ruta absoluta', async () => {
    const file = "C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba1"
    expect(routAbsolute(file)).toBe(file)
  });
});

//Funcion routExists // 
describe('Testear routExists', ()=> {
  it('deberia ser una funcion', () => {
    expect(typeof routExists).toBe('function'); 
  });

  it('deberia retornar true si la ruta es valida', async () => {
    expect(routExists('C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba')).toBe(true)
  }); 
  it('deberia retornar false si la ruta es valida', async () => {
    expect(routExists('C:\Users\USUARIO\Desktop\Laboratoria\Proyecto 4\DEV008-md-links\chiquiplop')).toBe(false)
  }); 
});

const extentionFilesMD = [
  "C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\directorio1\\prueba1.md",
  "C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\prueba2.md",
  "C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\prueba3.md",  
]

//Funcion isDirectory Funcion que valida si la ruta es un directorio y devuelve el array de archivos con extension .ms
describe('Funcion que valida si la ruta es un directorio y devuelve el array de archivos con extension .ms', ()=> {
  it('deberia ser una funcion', () => {
    expect(typeof isDirectory).toBe('function'); 
  });

  it('deberia retornar archivos .MD ', async () => {
    expect(isDirectory('C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba')).toEqual(extentionFilesMD)

  });
});

const readFilesMd = [
  { filePath: "C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\directorio1\\prueba1.md", content: "Link 1 [Slack](https://app.slack.com/client/T0NNB6T0R/D0577RP44AG) Link 2 [CanIuse](https://caniuse.com/) Link 3 [Bussu](https://www.busuu.com/dashboard#/timeline/b1) Link 4 [Bussu](https://www.busuu.com/dashboard#/timeline/b1)"},
  { filePath: "C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\prueba2.md", content: "Este si contiene varios links Redes sociales [Facebook](https://www.facebook.com/)[Instagram](https://www.instagram.com/)[LinkedIn](https://www.linkedin.com/feed/)[LinkedIn](https://www.linkedin.com/feed/)"},
  { filePath: "C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\prueba3.md", content: "" }
];


//Funcion readFilesMD Leer el contenido de los archivos .md
describe('Leer el contenido de los archivos .md', ()=> {
  it('deberia ser una funcion', () => {
    expect(typeof readFilesMD).toBe('function'); 
  });
  it('deberia retornar un array de objetos con la ruta y el contenido', async () => {
    expect(readFilesMD(extentionFilesMD)).toEqual(readFilesMd)

  });
});

const askForLinks = [ 
  {file: 'C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\directorio1\\prueba1.md',href: 'https://app.slack.com/client/T0NNB6T0R/D0577RP44AG', text: 'Slack'},
  {file: 'C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\directorio1\\prueba1.md',href: 'https://caniuse.com/', text: 'CanIuse'},
  {file: 'C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\directorio1\\prueba1.md',href: 'https://www.busuu.com/dashboard#/timeline/b1', text: 'Bussu'},
  {file: 'C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\directorio1\\prueba1.md',href: 'https://www.busuu.com/dashboard#/timeline/b1', text: 'Bussu'},
  {file: 'C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\prueba2.md',href: 'https://www.facebook.com/', text: 'Facebook'},
  {file: 'C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\prueba2.md',href: 'https://www.instagram.com/', text: 'Instagram'},
  {file: 'C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\prueba2.md',href: 'https://www.linkedin.com/feed/', text: 'LinkedIn'},
  {file: 'C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\prueba2.md',href: 'https://www.linkedin.com/feed/', text: 'LinkedIn'}
]

//Funcion extractLinks
describe('Extrae el path y el contenido del archivo', ()=> {
  it('deberia ser una funcion', () => {
    expect(typeof extractLinks).toBe('function'); 
  });
  it('deberia retornar los links file, href, text', async () => {
    expect(extractLinks(readFilesMd)).toEqual(askForLinks)

  });
});

const axiosHTTP = [
  {
    file: 'C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\directorio1\\prueba1.md',
    href: 'https://app.slack.com/client/T0NNB6T0R/D0577RP44AG',
    text: 'Slack',
    status: 200,
    mensaje: 'OK'
  },
  {
    file: 'C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\directorio1\\prueba1.md',
    href: 'https://caniuse.com/',
    text: 'CanIuse',
    status: 200,
    mensaje: 'OK'
  },
  {
    file: 'C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\directorio1\\prueba1.md',
    href: 'https://www.busuu.com/dashboard#/timeline/b1',
    text: 'Bussu',
    status: 200,
    mensaje: 'OK'
  },
  {
    file: 'C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\directorio1\\prueba1.md',
    href: 'https://www.busuu.com/dashboard#/timeline/b1',
    text: 'Bussu',
    status: 200,
    mensaje: 'OK'
  },
  {
    file: 'C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\prueba2.md',
    href: 'https://www.facebook.com/',
    text: 'Facebook',
    status: 200,
    mensaje: 'OK'
  },
  {
    file: 'C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\prueba2.md',
    href: 'https://www.instagram.com/',
    text: 'Instagram',
    status: 200,
    mensaje: 'OK'
  },
  {
    file: 'C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\prueba2.md',
    href: 'https://www.linkedin.com/feed/',
    text: 'LinkedIn',
    status: 200,
    mensaje: 'OK'
  },
  {
    file: 'C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba\\prueba2.md',
    href: 'https://www.linkedin.com/feed/',
    text: 'LinkedIn',
    status: 200,
    mensaje: 'OK'
  }
]

//Funcion askForAxios
describe('Extrae los datos de los links ', ()=> {
  it('deberia ser una funcion', () => {
    expect(typeof askForAxiosHTTP).toBe('function'); 
  });
  // it('deberia retornar un array de objeto que contenga las propiedades de status y mensaje', async () => {

  //   expect(await askForAxiosHTTP(askForLinks)).toEqual(axiosHTTP)

  // });
});

const uniqueTotallinks = { total: 8, unique: 6 }

//Funcion uniqueLinks
describe('Extrae las estadisticas de total y unique uniqueLinks', ()=> {
  it('deberia ser una funcion', () => {
    expect(typeof uniqueLinks).toBe('function'); 
  });
  it('deberia retornar un objeto con las estadisticas de total y unike', async () => {
    expect(uniqueLinks(askForLinks)).toEqual(uniqueTotallinks)

  });
});

const brokenTotallinks = { total: 8, unique: 6, broken: 0 }

//Funcion stadisticsBroken
describe('Muestra las estadisticas stadisticsBroken ', ()=> {
  it('deberia ser una funcion', () => {
    expect(typeof stadisticsBroken).toBe('function'); 
  });
  it('deberia retornar', async () => {
    expect(stadisticsBroken(askForLinks)).toEqual(brokenTotallinks)

  });
});