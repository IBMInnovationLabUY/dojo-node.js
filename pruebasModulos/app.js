const os = require('os');
const fs = require('fs');
const mm = require('./mi_modulo.js'); 

let platform = os.platform();
console.log(platform);
//let platform_string = JSON.stringify(platform);
//fs.appendFile('Plataform.txt',`Platform : ${platform_string}`);
//console.log(mm.year);
//mm.saludar();