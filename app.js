var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
// var socket = require("socket.io");
var alert = require("alert-node");

// var server = app.listen(process.env.PORT | 8000 , function() {
// 	console.log("Server running");
// });

// mongoose.connect("mongodb://localhost/goparkingdemo");
mongoose.connect(process.env.DATABASEURL);

// var bookingSchema = new mongoose.Schema({
// 	mall_name: String,
// 	vehicle_type: String,
// 	from: Number,
// 	till: Number,
// 	reg_no: String,
// 	contact: String,
// 	price: Number,
// 	grandtotal: Number
// });

// var Bookings = mongoose.model("Booking", bookingSchema);

var mallSchema = new mongoose.Schema({
	name: String,
	parkings_2w: Number,
	parkings_4w: Number,
	slots_2w: [Array], 
	slots_4w: [Array]
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
			for(var i=0;i<newMall.parkings_2w;i++) {
				newMall.slots_2w.push([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
			}
			for(var i=0;i<newMall.parkings_4w;i++) {
				newMall.slots_4w.push([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
			}
			newMall.save();
			res.redirect("/admin");
		}
	});
});

app.get("/", function(req, res) {
	res.render("landing", {clock:clock});
});

app.post("/booking", function(req, res) {
	Malls.findOne({name: req.body.mall_name}, function(err, found) {
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
			else {
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
					else {
						Price = (parseInt(req.body.hours) * 25);
					}
				}
				else {
					if(d.getDay() >= 1 && d.getDay() <= 4) {
						Price = (parseInt(req.body.hours) * 25);
					}
					else {
						Price = (parseInt(req.body.hours) * 40);
					}
				}
				var gt = Price + 10;

				if(req.body.vehicle_category === "2w") {
					for(var i=0; i < found.parkings_2w; i++) {
						var isEmpty = true;
						for(var j=parseInt(req.body.start_time)-1; j<=parseInt(req.body.start_time)-2+parseInt(req.body.hours); j++) {
							if(found.slots_2w[i][j] === true) {
								isEmpty=false;
								break;
							}
						}

						var updatedfound = found;

						if(isEmpty === true) {
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
									for(var k=req.body.start_time-1; k<=parseInt(req.body.start_time) + parseInt(req.body.hours) - 2; k++) {
										updatedfound.slots_2w[i][k] = true;
									}
									console.log(updatedfound);
									Malls.findOneAndUpdate({name: req.body.mall_name}, updatedfound, function(err, updated) {
										if(err) {
											console.log(err);
										}
										else {
											res.redirect("/booking/" + newBooking._id + "/verify");
										}
									})
								}
							});
							break;
						}
					}

					if(req.body.vehicle_category === "4w") {
						for(var i=0; i < found.parkings_4w; i++) {
							var isEmpty = true;
							for(var j=parseInt(req.body.start_time)-1; j<=parseInt(req.body.start_time)-2+parseInt(req.body.hours); j++) {
								if(found.slots_4w[i][j] === true) {
									isEmpty=false;
									break;
								}
							}

							var updatedfound = found;

							if(isEmpty === true) {
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
										for(var k=req.body.start_time-1; k<=parseInt(req.body.start_time) + parseInt(req.body.hours) - 2; k++) {
											updatedfound.slots_4w[i][k] = true;
										}
										console.log(updatedfound);
										Malls.findOneAndUpdate({name: req.body.mall_name}, updatedfound, function(err, updated) {
											if(err) {
												console.log(err);
											}
											else {
												res.redirect("/booking/" + newBooking._id + "/verify");
											}
										})
									}
								});
								break;
							}
						}
					}

					if(isEmpty === false) {
						res.redirect("/");
					}
				}
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

app.get("/:id/payment", function(req, res) {
	Bookings.findById(req.params.id, function(err, foundBooking) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("payment", {booking:foundBooking});
		}
	});
});

app.listen(process.env.PORT, process.env.IP, function() {
	console.log("Server started");
});