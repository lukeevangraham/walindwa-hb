let express = require("express");
let PORT = process.env.PORT || 6543;
let app = express();
let dotenv = require("dotenv").config()

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars
let exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main",
    helpers: require("./controllers/handlebars-helpers")
}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them
let routes = require("./controllers/routes.js");

app.use(routes);

app.listen(PORT, function () {
  console.log("Server listening on http://localhost:" + PORT);
});
