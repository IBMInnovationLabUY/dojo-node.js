var async = require('async');
var task=[];
 
task.push(function(cb){
setTimeout(function(){console.log("first");
cb(null,"firstCallBack");
},3000)
 
});
task.push(function(cb){
setTimeout(function(){console.log("second");
cb(null,"secondCallBack");}
,1000)
 
});
task.push(function(cb){
setTimeout(function(){console.log("final");
cb(null,"finalCallBack");}
,6000)
 
});
 
//async.series(task);
//async.parallel(task);