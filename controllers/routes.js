let express = require("express");
let router = express.Router();
let axios = require("axios");

router.get("/", (req, res) => {
  Promise.all([axios.get("http://admin.moreleft.com/home")]).then(
    (resultArray) => {
      let hbsObject = {
        homeSingle: resultArray[0],
        title: `Home`,
      };
      res.render("index", hbsObject);
    }
  );
});

router.get("/board", (req, res) => {
  Promise.all([axios.get("http://admin.moreleft.com/board-members")]).then(
    (resultArray) => {
      let hbsObject = {
        boardMembers: resultArray[0],
        title: `Board`,
      };
      res.render("./sections/about/board", hbsObject);
    }
  );
});

router.get("/board:id", function (req, res) {
  Promise.all([
    axios.get(
      "http://admin.moreleft.com/board-members/" + req.params.id.substr(1)
    ),
  ]).then((resultArray) => {
    let hbsObject = {
      boardMember: resultArray[0],
      title: resultArray[0].data.firstName + " " + resultArray[0].data.lastName,
    };
    res.render("./sections/about/board-member", hbsObject);
  });
});

router.get("/overview", function (req, res) {
  let hbsObject = {
    title: "Overview",
  };
  res.render("./sections/about/overview", hbsObject);
});

router.get("/corporate-info", (req, res) => {
  Promise.all([
    axios.get("http://admin.moreleft.com/organization-documents/"),
  ]).then((resultArray) => {
    let docs = resultArray[0].data;
    docs.forEach((doc) => {
      doc.Type === "Tax"
        ? Object.assign(doc, { isTax: true })
        : Object.assign(doc, { isTax: false });
    });
    let hbsObject = {
      docs: docs,
      title: "Corporate Information",
    };
    res.render("./sections/about/corporate-info", hbsObject);
  });
});

router.get("/kenya", (req, res) => {
  let hbsObject = {
    title: "Kenya, Eldama Ravine and Kamonong Community",
    headLink: `<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin=""/> <!-- Make sure you put this AFTER Leaflet's CSS -->
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
      integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
      crossorigin=""></script>`
  }
  res.render("./sections/kenya/kenya", hbsObject);
})

router.get("/projects", (req, res) => {
  let hbsObject = {
    title: "Projects"
  }
  res.render("./sections/kenya/projects", hbsObject)
})

module.exports = router;
