let express = require("express");
let router = express.Router();
let axios = require("axios");

router.get("/", (req, res) => {
  let hbsObject = {};
  console.log(hbsObject);
  res.render("index", hbsObject);
});

module.exports = router;
