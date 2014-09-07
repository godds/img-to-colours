#! /usr/bin/env node

//exports.img-to-colours = function() {

  var fs = require("fs"),
      pngparse = require("pngparse");

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  pngparse.parseFile(process.argv[2], function(err, data) {
    if (err) {
      console.error("Error: " + err);
      return;
    }

    var result = [];
    for (var i = 0; i < (data.width * 4); i += 4) {
      result.push((i ? i / 4 : 0) + ": #" + componentToHex(data.data[i]) + componentToHex(data.data[i+1]) + componentToHex(data.data[i+2]));
    }

    fs.writeFile(process.argv[3], result.join("\n"), function(err) {
      if (err) {
        console.error("Error: " + err);
      }
      else {
        console.log("successfully saved details to " + process.argv[3]);
      }
    });
  });
//};
