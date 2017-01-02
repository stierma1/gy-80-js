var PLSR = require("pid-system-utils").PLSR;
var System = require("pid-system");
var plsr = require("./plsr-config");

PLSR(plsr)
  .then(function(){
    return System.resolve("start")
  })
  .then(function(pid){
    pid.emit("data", {
      adxl345: new Buffer([0x00,0,0,0,0x00,0xf0]),
      hmc5883l: new Buffer([-1,0,0,0,1,0]),
      l3g4200d: new Buffer([0x00,0x23,0x42,0xf2,0x1a,0x02])
    })
    pid.emit("data", {
      adxl345: new Buffer([0x56,0x00,0,0,0x00,0xf0]),
      hmc5883l: new Buffer([-1,0,0,0,1,0]),
      l3g4200d: new Buffer([0x00,0x23,0x42,0xf2,0x1a,0x02])
    })
    pid.emit("data", {
      adxl345: new Buffer([0x64,0x00,0,0,0x00,0xf0]),
      hmc5883l: new Buffer([-1,0,0,0,1,0]),
      l3g4200d: new Buffer([0x00,0x23,0x42,0xf2,0x1a,0x02])
    })
  })
