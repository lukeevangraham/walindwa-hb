let express = require("express");
let router = express.Router();
let axios = require("axios");

router.get("/", (req, res) => {
  Promise.all([
    axios.get("http://localhost:1337/home")
  ])
  .then(resultArray => {
    console.log(`LOOK HERE: `, resultArray[0].data)
    let hbsObject = {
      homeSingle: resultArray[0]
    };
    // console.log(hbsObject);
    res.render("index", hbsObject);
  })
});

module.exports = router;
