let express = require("express");
let router = express.Router();
let axios = require("axios");

router.get("/", (req, res) => {
  Promise.all([
    axios.get("http://admin.moreleft.com/home")
  ])
  .then(resultArray => {
    // console.log(`LOOK HERE: `, resultArray[0].data)
    let hbsObject = {
      homeSingle: resultArray[0],
      title: `Home`
    };
    // console.log(hbsObject);
    res.render("index", hbsObject);
  })
});

router.get("/board", (req, res) => {
  Promise.all([
    axios.get("http://admin.moreleft.com/board-members")
  ])
  .then(resultArray => {
    let hbsObject = {
      boardMembers: resultArray[0],
      title: `Board`
    };
    res.render("./sections/about/board", hbsObject);
  })
})

router.get("/board:id", function (req, res) {
    // console.log("LOOK HERE: ", req.params.id.substr(1))
    Promise.all([
      axios.get("http://admin.moreleft.com/board-members/" + req.params.id.substr(1))
    ])
    .then(resultArray => {
      let hbsObject = {
        boardMember: resultArray[0],
        title: resultArray[0].data.firstName + " " + resultArray[0].data.lastName
      };
      // console.log("HBS: ", hbsObject)
      res.render("./sections/about/board-member", hbsObject);
    })
})

module.exports = router;
