var sylvester = require("sylvester");

function flipZaxis(arr){
  return [
    arr[0],
    arr[1],
    arr[2]*-1
  ]
}

function _vectorize(arr){
  return sylvester.Vector.create(arr);
}

function vectorize(message){
  var vectors = {
    adxl345: _vectorize(message.adxl345).toUnitVector(),
    hmc5883l: _vectorize(message.hmc5883l).toUnitVector(),
    l3g4200d: _vectorize(flipZaxis(message.l3g4200d))
  }

  this.emit("data", vectors);

  return vectors;
}

module.exports = vectorize
