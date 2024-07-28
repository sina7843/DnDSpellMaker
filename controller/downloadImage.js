var fs = require("fs"),
  request = require("request");

var download = function (uri, filename, callback) {
  try {
    request.head(uri, function (err, res, body) {
      console.log(uri);
      request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
    });
  } catch (err) {
    console.err(err);
  }
};

module.exports = download;
