var https = require("https");
var download = require("./downloadImage");


var scrapper = function (url, SpellName) {
  https
    .get(url, function (res) {
      res.setEncoding("utf8");
      res.on("data", function (data) {
        Img = getImage(data);
        if (Img != undefined && Img.includes("300px")) {
          download(
            Img,
            `./public/images/${SpellName.replaceAll("\\", " ")}.png`,
            () => {
              console.log(SpellName);
            }
          );
        }
      });
    })
    .on("error", function (e) {
      console.log("Got error: " + e.message);
    });
};

var getImage = (data) => {
  indexStart = data.indexOf('<img alt="');
  if (indexStart > -1) {
    data = data.slice(indexStart, indexStart + 300);
    srcImg = data.slice(data.indexOf('src="'));
    srcImg = srcImg.slice(5, srcImg.indexOf('.png"') + 4);
    return "https://bg3.wiki/" + srcImg;
  }
  return undefined;
};

module.exports = scrapper;
