let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  let hbsObject = {};
  console.log(hbsObject);
  res.render("index", hbsObject);
});

module.exports = router;
