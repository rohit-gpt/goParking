var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
// var socket = require("socket.io");
var alert = require("alert-node");

var server = app.listen(process.env.PORT, process.env.ID, function() {
	console.log("Server running");
});

// mongoose.connect("mongodb://localhost/goparkingdemo");
mongoose.connect(process.env.DATABASEURL);

var mallSchema = new mongoose.Schema({
	name: String,
	parkings_2w: Number,
	parkings_4w: Number,
	occupied_2w: [
		{
			stt: Number,
			edt: Number,
			isOccupied: Boolean
		}
	],
	occupied_4w: [
		{
			stt: Number,
			edt: Number,
			isOccupied: Boolean
		}
	]
});

var Malls = mongoose.model("Mall", mallSchema);

var clock = ["11:00 AM","12:00 PM","13:00 PM","14:00 PM","15:00 PM","16:00 PM","17:00 PM","18:00 PM","19:00 PM","20:00 PM","21:00 PM","22:00 PM","23:00 PM"];

var bookingSchema = new mongoose.Schema({
	mall_name: String,
	vehicle_type: String,
	start: Number,
	end_time: Number,
	reg_no: String,
	contact: Number,
	price: Number,
	grandtotal: Number
});

var Bookings = mongoose.model("Booking", bookingSchema);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// var io = socket(server);

// io.on("connection", function(socket) {

// });

app.get("/admin", function(req, res) {
	res.render("admin");
});

app.post("/malls", function(req, res) {
	Malls.create(req.body.new, function(err, newMall) {
		if(err) {
			console.log(err);
		}
		else {
			for(var i=0;i<newMall.parking_2w;i++) {
				newMall.occupied_2w.push(false);
			}
			for(var j=0;j<newMall.parking_4w;j++) {
				newMall.occupied_4w.push(false);
			}
			res.redirect("/admin");
		}
	});
});

app.get("/", function(req, res) {
	res.render("landing", {clock:clock});
});

app.post("/booking", function(req, res) {
	Malls.find({name: req.body.mall_name}, function(err, found) {
		if(err) {
			res.redirect("/");
			alert("Please Select Valid Mall Name");
		}
		else
		{
			if(req.body.start_time == "") {
				res.redirect("/");
				alert("Please Select Appropriate Time");
			}
			else
			{
				var st = parseInt(clock[req.body.start_time-1][0] + clock[req.body.start_time-1][1]);
				var end = st+parseInt(req.body.hours);
				if(end===24) {
					end = 0;
				}
				else if(end > 24) {
					end = end-24;
				}
				var d = new Date();
				var Price;
				if(req.body.vehicle_type === "2w") {
					if(d.getDay() >= 1 && d.getDay() <= 4) {
						Price = (parseInt(req.body.hours) * 15);
					}
					else
					{
						Price = (parseInt(req.body.hours) * 25);
					}
				}
				else {
					if(d.getDay() >= 1 && d.getDay() <= 4) {
						Price = (parseInt(req.body.hours) * 25);
					}
					else
					{
						Price = (parseInt(req.body.hours) * 40);
					}
				}
				var gt = Price + 10;
				Bookings.create({
					mall_name: req.body.mall_name,
					vehicle_type: req.body.vehicle_category,
					start: st,
					end_time: end,
					reg_no: req.body.reg_number,
					contact: req.body.contact,
					price: Price,
					grandtotal: gt
				}, function(err, newBooking) {
					if(err) {
						console.log(err);
						res.redirect("/");
					}
					else {
						res.redirect("/booking/" + newBooking._id + "/verify");
					}
				});
			}
		}
	});
});

app.get("/pricing", function(req, res) {
	res.render("pricing");
});

app.get("/booking/:id/verify", function(req, res) {
	Bookings.findById(req.params.id, function(err, found) {
		if(err) {
			console.log(err);
		}
		else
		{
			res.render("verify", {booking:found});
		}
	});
});

app.get("/extend", function(req, res) {
	res.render("extendform");
});

app.get("/extend/:id", function(req, res) {
	res.render("extend");
});