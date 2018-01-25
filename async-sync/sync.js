var read = require("fs").readFileSync;

console.log("hola");
let data = read("x.txt","UTF-8", function(error){
    if (error)
        console.log("error");
});
console.log(data);
console.log("ya!");