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
      crossorigin=""></script>`,
  };
  res.render("./sections/kenya/kenya", hbsObject);
});

router.get("/projects", (req, res) => {
  Promise.all([
    axios.get(
      "http://admin.moreleft.com/projects?status_eq=Current&Published_eq=true&_sort=id:DESC"
    ),
    axios.get(
      "http://admin.moreleft.com/projects?status_eq=Completed&Published_eq=true&_sort=id:DESC"
    ),
  ]).then((resultArray) => {
    let hbsObject = {
      title: "Projects",
      currentProjects: resultArray[0].data,
      completedProjects: resultArray[1].data,
    };
    res.render("./sections/kenya/projects", hbsObject);
  });
});

router.get("/project:id", (req, res) => {
  Promise.all([
    axios.get("http://admin.moreleft.com/projects?Published_eq=true&id_eq=" + req.params.id.substr(1)),
    axios.get("http://admin.moreleft.com/projects?Published_eq=true&id_ne=" + req.params.id.substr(1) + "&_sort=id:DESC&_limit=6")
  ]).then((resultArray) => {
    let hbsObject = {
      title: resultArray[0].data[0].name,
      project: resultArray[0].data[0],
      otherProjects: resultArray[1].data
    }
    res.render("./sections/kenya/project", hbsObject)
  })
})

router.get("/students", (req, res) => {
  let hbsObject = {
    title: "Student Sponsorship"
  }
  res.render("./sections/sponsorship/students", hbsObject)
})

router.get("/post-high-school", (req, res) => {
  let hbsObject = {
    title: "Post-High School Sponsorship"
  }
  res.render("./sections/sponsorship/post-high-school", hbsObject)
})

router.get("/blog", (req, res) => {
  Promise.all([
    axios.get("http://admin.moreleft.com/blogs?publish=true&_sort=datePosted:DESC&_start=0&_limit=6")
  ]).then((resultArray) => {
    let hbsObject = {
      blogEntries: resultArray[0].data,
      title: "Trip Blog"
    }
    res.render("./sections/updates/blog", hbsObject)
  })
})

router.get("/blog:id", (req, res) => {
  Promise.all([
    axios.get("http://admin.moreleft.com/blogs?publish_eq=true&id_eq=" + req.params.id.substr(1)),
    axios.get("http://admin.moreleft.com/blogs?publish_eq=true&id_eq=" + (parseInt(req.params.id.substr(1)) - 1)),
    axios.get("http://admin.moreleft.com/blogs?publish_eq=true&id_eq=" + (parseInt(req.params.id.substr(1)) + 1)),
  ]).then((resultArray) => {
    let unparsedFirstName = resultArray[0].data[0].Author.split(` `)
    Promise.all([
      axios.get("http://admin.moreleft.com/board-members?firstName_contains=" + unparsedFirstName[0] + "&firstName_contains=" + unparsedFirstName[1] + "&lastName_contains=" + unparsedFirstName[0] + "&lastName_contains=" + unparsedFirstName[1])
    ]).then((secondArray) => {
      let hbsObject = {
        title: resultArray[0].data[0].name,
        blogEntry: resultArray[0].data[0],
        prevEntry: resultArray[1].data[0],
        nextEntry: resultArray[2].data[0],
        authorInfo: secondArray[0].data[0]
      }
      res.render("./sections/updates/blogSingle", hbsObject)
    })
  })
})

router.get("/newsletters", (req, res) => {
  Promise.all([
    axios.get("http://admin.moreleft.com/newsletters?_sort=id:DESC")
  ]).then((resultArray) => {
    let hbsObject = {
      title: "Newsletters",
      newsletters: resultArray[0].data
    }
    res.render("./sections/updates/newsletters", hbsObject)
  })
})

module.exports = router;
