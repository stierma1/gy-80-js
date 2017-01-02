var sylvester = require("sylvester");

function orientation(message) {
    var front = this.getValue("frontVector");
    if(!front){
      front = sylvester.Vector.create([0,1,0]);
    }
    var angle = front.angleFrom(message.north);
    var rotationMatrix = sylvester.Matrix.Rotation(angle, message.north.cross(front));

    var yaw = Math.atan2(rotationMatrix.e(2,1), rotationMatrix.e(1,1))

    var vectors = {
        adxl345: message.adxl345,
        hmc5883l: message.hmc5883l,
        l3g4200d: message.l3g4200d,
        north: message.north,
        east: message.east,
        gravity: message.gravity,
        rotationMatrix,
        yaw
    }

    this.emit("data", vectors);
    return vectors;
}

module.exports = orientation
