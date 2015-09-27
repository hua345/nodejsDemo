var colors = require('colors/safe');
 
 // set theme 
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

console.log(colors.green('hello')); // outputs green text 
console.log(colors.red.underline('i like cake and pies')) // outputs red underlined text 
console.log(colors.inverse('inverse the color')); // inverses the color 
console.log(colors.rainbow('OMG Rainbows!')); // rainbow 
console.log(colors.info('info colors'));
 console.log(colors.data('data colors')); 
 console.log(colors.warn('warn colors')); 
 console.log(colors.input('input colors')); 
