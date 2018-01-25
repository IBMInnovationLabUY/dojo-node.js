var read = require("fs").readFile;
console.log("hola");
let data = read("x.txt","UTF-8", function(err,data){
	console.log(data);
});

console.log("ya!");
