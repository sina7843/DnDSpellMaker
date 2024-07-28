var express = require("express");
var router = express.Router();
var download = require("../controller/downloadImage");
var readExcell = require("../controller/readExcell");
var scrapper = require("../controller/scrapper");

/* GET home page. */
router.get("/", function (req, res, next) {
  //scrapper();
  readExcell.read();
  res.send(req.query.id);
});

module.exports = router;
