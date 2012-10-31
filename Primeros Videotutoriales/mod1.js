var valorGlobal; 
 
exports.setGlobal = function(val) { 
   valorGlobal = val; 
}; 
 
exports.returnGlobal = function() { 
   console.log(global); 
   return valorGlobal; 
};