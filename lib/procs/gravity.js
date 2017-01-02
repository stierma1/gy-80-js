var sylvester = require("sylvester");
var Kalman = require("../maths/kalman");

function gravity(message){
  if(!this.getValue("initialized")){
    this.putValue("previousEstGravityX", 0);
    this.putValue("previousEstGravityY", 0);
    this.putValue("previousEstGravityZ", -1);
    this.putValue("previousStateEstimateErrorX", .2);
    this.putValue("previousStateEstimateErrorY", .2);
    this.putValue("previousStateEstimateErrorZ", .2);
    this.putValue("initialized", true);
  }

  var east = message.adxl345.cross(message.hmc5883l);
  var shortGravity = message.hmc5883l.cross(east).toUnitVector();
  var prevErrorX = this.getValue("previousStateEstimateErrorX")
  var prevErrorY = this.getValue("previousStateEstimateErrorY")
  var prevErrorZ = this.getValue("previousStateEstimateErrorZ")

  var kalmanGainX = Kalman.kalmanGain(prevErrorX, .2);
  var kalmanGainY = Kalman.kalmanGain(prevErrorY, .2);
  var kalmanGainZ = Kalman.kalmanGain(prevErrorZ, .2);

  var kalmanEstimateX = Kalman.kalmanEstimate(this.getValue("previousEstGravityX"), shortGravity.e(1), kalmanGainX);
  var kalmanEstimateY = Kalman.kalmanEstimate(this.getValue("previousEstGravityY"), shortGravity.e(2), kalmanGainY);
  var kalmanEstimateZ = Kalman.kalmanEstimate(this.getValue("previousEstGravityZ"), shortGravity.e(3), kalmanGainZ);

  this.putValue("previousStateEstimateErrorX", Math.abs(kalmanEstimateX - this.getValue("previousEstGravityX")) + .2);
  this.putValue("previousStateEstimateErrorY", Math.abs(kalmanEstimateY - this.getValue("previousEstGravityY")) + .2);
  this.putValue("previousStateEstimateErrorZ", Math.abs(kalmanEstimateZ - this.getValue("previousEstGravityZ")) + .2);

  this.putValue("previousEstGravityX", kalmanEstimateX);
  this.putValue("previousEstGravityY", kalmanEstimateY);
  this.putValue("previousEstGravityZ", kalmanEstimateZ);


  var gravity = sylvester.Vector.create([kalmanEstimateX, kalmanEstimateY, kalmanEstimateZ]);

  var north = east.cross(gravity);

  var vectors = {
    adxl345: message.adxl345,
    hmc5883l: message.hmc5883l,
    l3g4200d: message.l3g4200d,
    north,
    east,
    gravity
  }

  this.emit("data", vectors);
  return vectors;
}

module.exports = gravity
