var XLSX = require("xlsx");
var scrapper = require("./scrapper");
const nodeHtmlToImage = require("node-html-to-image");
const HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Junge&display=swap"
      rel="stylesheet"
    />
  </head>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: "Inter", sans-serif;
      font-weight: normal;
      font-style: normal;
      font-variation-settings: "slnt" 0;
      color : {{textColor}}
    }
    .container {
      background-image: url("{{BackImage}}"); /*school*/
      background-size: 100% 100%;
      width: 6cm;
      height: 9cm;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .border {
      background-image: url("./img/Group\ 8.png");
      background-size: 100% 100%;
      width: 5.8cm;
      height: 8.8cm;
      position: absolute;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .schoolSymbol {
      width: 0.45cm;
    }
    .spellName {
      background-image: url("{{NameImage}}");
      background-size: 100% 100%;
      width: 4.5cm;
      height: 1cm;
      margin-top: -0.15cm;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: bold;
      font-family: "Junge", cursive;
      font-weight: 400;
      font-style: normal;
    }
    .spellImage {
      width: 2.2cm;
      margin-top: -0.2cm;
      margin-bottom: -0.5cm;
    }
    .spellAtt {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .box {
      background-color: {{colorCode}};
      border: 2px solid #f5e57f;
    }
    .Level {
      font-size: 8px;
      width: 1.3cm;
      height: 0.5cm;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: -0.12cm;
      z-index: 1;
      font-weight: bold;
    }
    .attr {
      font-size: 8px;
      font-weight: bold;
      width: 5.4cm;
      margin-bottom: 0.05cm;
      height: 1cm;
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      align-content: space-around;
      justify-content: space-around;
    }
    .attr > div {
      width: 33%;
    }
    .detail {
      width: 5.4cm;
      height: 4.2cm;
      background-image: url("{{DetailImage}}");
      background-size: 100% 100%;
      padding: 3px;
    }
  </style>
  <body>
    <div class="container">
      <div class="border">
        <div class="schoolSymbol">
          <img
            src="{{classImage}}"
            alt=""
            style="width: 100%"
          /><!--school Symbol-->
        </div>
        <div class="spellName" id="Name">{{Name}}</div>
        <div class="spellImage">
          <img
            src="{{spellImage}}"
            alt=""
            style="width: 100%"
          /><!--Spell Image-->
        </div>
        <div class="spellAtt">
          <div class="box Level">{{Level}}</div>
          <!--Spell Level-->
          <div class="box attr">
            <div><i class="fa-regular fa-clock"></i> {{CastingTime}}</div>
            <div><i class="fa-solid fa-bullseye"></i> {{Range}}</div>
            <div><i class="fa-regular fa-clone"></i> {{Situation}}</div>
            <div><i class="fa-solid fa-hourglass-end"></i> {{Duration}}</div>
            <div><i class="fa-solid fa-shield"></i> {{Save}}</div>
            <div><i class="fa-solid fa-fire"></i> {{Effect}}</div>
            <!--Spell Attr-->
          </div>
        </div>
        <div class="detail" id="Detail">{{Details}}</div>
        <!--Spell Detail-->
      </div>
    </div>

    <script
      src="https://kit.fontawesome.com/3a67b0646e.js"
      crossorigin="anonymous"
    ></script>
    <script>
      function adjustFontSizeName() {
        var container = document.getElementById("Name");
        var textLength = container.textContent.length;
        if (textLength > 25) {
          container.style.fontSize = "12px";
        } else if (textLength > 20) {
          container.style.fontSize = "15px";
        } else if (textLength > 15) {
          container.style.fontSize = "18px";
        } else {
          container.style.fontSize = "24px";
        }
      }
      function adjustFontSizeDetail() {
        var container = document.getElementById("Detail");
        var textLength = container.textContent.length;
        console.log(textLength);
        container.style.fontSize = textLength * -0.0058 + 14 + "px";
      }
      adjustFontSizeName();
      adjustFontSizeDetail();
    </script>
  </body>
</html>`;

var read = function (uri, filename, callback) {
  var workbook = XLSX.readFile("./public/Dnd.xlsx");
  var sheet_name_list = workbook.SheetNames;
  var DataEn = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  var DataFa = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);
  let content = [];
  for (data of DataEn) {
    let colorCode = "";
    let textColor = "";
    if (data.School == "Abjuration") {
      colorCode = "#075DC2";
      textColor = "white";
    } else if (data.School == "Conjuration") {
      colorCode = "#FFDB1E";
      textColor = "black";
    } else if (data.School == "Divination") {
      colorCode = "#8EF1FF";
      textColor = "black";
    } else if (data.School == "Enchantment") {
      colorCode = "#FF99F5";
      textColor = "black";
    } else if (data.School == "Evocation") {
      colorCode = "#E61A2E";
      textColor = "black";
    } else if (data.School == "Illusion") {
      colorCode = "#B28EFF";
      textColor = "black";
    } else if (data.School == "Necromancy") {
      colorCode = "#8EFFA7";
      textColor = "black";
    } else {
      colorCode = "#FE9B41";
      textColor = "black";
    }
    content.push({
      NameImage: `./School/${data.School}/name.png`,
      DetailImage: `./School/${data.School}/detail.png`,
      BackImage: `./School/${data.School}/back.png`,
      classImage: `./School/${data.School}/class.png`,
      spellImage: `./images/${data.Name.trim()
        .replace(" ", "_")
        .replace("//", "-")
        .replace("\\", "-")}.png`,
      Name: data.Name,
      Level: data.Level > 0 ? "Spell Level " + data.Level : "Cantrip",
      School: data.School,
      CastingTime: data["Casting Time"],
      Duration: data.Duration,
      Range: data.Range,
      Save: data["Attack/Save"],
      Effect: data["Damage/Effect"],
      Details: data.Details,
      Situation: data.__EMPTY,
      colorCode: colorCode,
      textColor: textColor,
      output: "./Image/" + data.Name,
    });
  }
  nodeHtmlToImage({
    html: HTML,
    content: content,
  }).then(() => console.log("The images were created successfully!"));
  // var interval = setInterval(() => {
  //   let spellName = xlData[index].Name.trim().replaceAll(" ", "_");
  //   scrapper(`https://bg3.wiki/wiki/${spellName}`, spellName);
  //   index++;
  //   console.log(index);
  //   if (index >= xlData.length) {
  //     clearInterval(interval);
  //   }
  // }, 200);
  // console.log(result);
};

module.exports = {
  read,
};
