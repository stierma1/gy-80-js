var fs = require("fs");
var path = require("path");

function storeReadings(message){
    fs.appendFileSync(path.join(__dirname, "../../sensor-data.json"), JSON.stringify(message) + ",\n");
    return message;
}

module.exports = storeReadings;
