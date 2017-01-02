var adxl345B2V = require("adxl345-bytes-to-vector");
var hmc5883lB2V = require("hmc5883l-bytes-to-vector");

function bytesToInts(message){
  var ints = [];
  for(var i = 0; i < message.length; i++){
    ints[i] = message[i];
  }

  return ints;
}

function refine(message){
  var data = {
    adxl345: adxl345B2V(bytesToInts(message.adxl345)),
    hmc5883l: hmc5883lB2V(bytesToInts(message.hmc5883l)),
    l3g4200d: adxl345B2V(bytesToInts(message.l3g4200d))
  };
  this.emit("data", data);
  return data;
}

module.exports = refine;
