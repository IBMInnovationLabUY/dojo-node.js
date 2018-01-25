const https = require ('https');
let CHROME_USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36';
let options = {
	host: 'api.github.com',
	path:'/users/' + "jpff96",
	method: 'GET',
	headers: { 'user-agent': CHROME_USER_AGENT}
};

//Pasamos options como parametro esperando una respuesta la cual guardaremos en body
let request = https.request(options,function(response){ 
    let body = '';
    response.on('data',function(out){
        body += out; //concateno la salida devuelta en out a la variable body
    });

    response.on('end', function(out){
        let json = JSON.parse(body); //convierto en json la respuesta almacenada para imprimirla en consola 
        console.log(json);
    });
});

//Si sucede algun error imprimimos el error
request.on('error',function(e){
    console.log(e);
});
request.end();