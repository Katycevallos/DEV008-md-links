#!/usr/bin/env node
const chalk = require('chalk');
const meow = require('meow');
const { mdLinks } = require('./index');  
//const boxen = require('boxen');


const cli = meow(`
${chalk.greenBright('BIENVENIDO A MDLINKS ')}

${chalk.bgMagentaBright('-----------------------------------------------------------------------------------------------------------')}	                                     	
                                                                                                                                                    
        ${chalk.bgMagenta('Opciones')}                                                                                                         
           ${chalk.yellowBright('=>')}  --stats,                ${chalk.cyan('Estadísticas básicas sobre los links')}           
           ${chalk.yellowBright('=>')} --validate               ${chalk.cyan('Verifica si el link es valido')}                                 
           ${chalk.yellowBright('=>')} --stats --validate       ${chalk.cyan('Estadisticas añadiendo el estatus del link')} 
           ${chalk.yellowBright('=>')} En caso de que no exista ninguna opción se mostrará el enlace, la ruta, texto del enlace y enlace 


        ${chalk.bgMagenta('Modo de uso')}

           ${chalk.yellowBright('=>')} $ mdLinks <path>


        ${chalk.bgMagenta('Ejemplos')}

           ${chalk.yellowBright('=>')}  $ mdlinks ./prueba --stats 
           ${chalk.yellowBright('=>')}  $ mdlinks ./prueba --validate 
           ${chalk.yellowBright('=>')}  $ mdlinks ./prueba --stats --validate 

${chalk.bgMagentaBright('-----------------------------------------------------------------------------------------------------------')}	 
`, {
    importMeta: require.meta,
  input: ['path'],
  flags: {
    validate: {
      type: 'boolean',
      shortFlag: 'V'
    },
    stats: {
      type: 'boolean',
      shortFlag: 'S'
    },
    
  }
});

if (cli.input[0] == undefined) {
  console.log('Favor ingrese una ruta');
} else {
  mdLinks(cli.input[0], cli.flags)
    .then(response => {
      if (cli.flags.stats === false) {
        response.forEach(item => {
          if (cli.flags.validate === true) {
            console.log(chalk.yellow(item.file), chalk.greenBright(item.href), chalk.cyan(item.text), chalk.green(item.status), chalk.blueBright(item.mensaje));
          } else {
            console.log(chalk.yellow(item.file), chalk.greenBright(item.href), chalk.cyan(item.text));
          }
        });
      } else {
        if (cli.flags.validate === true) {
          console.log(chalk.bgWhiteBright('Total:'), response.total);
          console.log(chalk.bgBlackBright('Unique:'), response.unique);
          console.log(chalk.bgRed('Broken:'), response.broken);
        } else {
          console.log(chalk.bgCyanBright('Total:'), response.total);
          console.log(chalk.bgGrey('Unique:'), response.unique);
        }
      }
    })
    .catch(error => { console.log(error); });
}

// mdLinks("../README.md", {validate: true, stats: false})
//   .then(prueba => {

//     console.log(chalk.green('total:', prueba.total));
//     console.log(chalk.red('unique:', prueba.unique));
//     console.log(chalk.red('broken:', prueba.broke));
//   })
//   .catch(error => {
//     console.log(error)
//   });
