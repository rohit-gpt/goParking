var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res) {
	res.render("landing");
});

app.listen(8080, function() {
	console.log("Server running on port 8080");
});