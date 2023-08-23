//const mdLinks = require('../src/funciones');
const { routAbsolute, routExists, isDirectory, getMDExtention, readFiles, readLinks, falseLinks, askForHTTP, validateStatsLinks } = require ("../src/funciones");
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
    const file = "C:\\Users\\USUARIO\\Desktop\\Laboratoria\\Proyecto 4\\DEV008-md-links\\prueba"
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

//Funcion getMDExtention // 
describe('Testear getMDExtention', ()=> {
  it('deberia ser una funcion', () => {
    expect(typeof getMDExtention).toBe('function'); 
  });
});

