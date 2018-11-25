# goParking
Website that solves the purpose of parking issues in malls by providing online parking reservation services.


// if(req.body.vehicle_category === "2w") {
				// 	found.slots_2w.forEach(function(slot) {
				// 		var check = false;
				// 		for(var i=req.body.start_time-1; i<=(req.body.start_time-1+req.body.hours); i++) {
				// 			if(slot[i] === true)
				// 				check = true;
				// 				break;
				// 		}
				// 		if(check === false) {
				// 			Bookings.create({
				// 				mall_name: req.body.mall_name,
				// 				vehicle_type: req.body.vehicle_category,
				// 				start: st,
				// 				end_time: end,
				// 				reg_no: req.body.reg_number,
				// 				contact: req.body.contact,
				// 				price: Price,
				// 				grandtotal: gt
				// 			}, function(err, newBooking) {
				// 				if(err) {
				// 					console.log(err);
				// 					res.redirect("/");
				// 				}
				// 				else {
				// 					for(var i=req.body.start_time-1; i<(req.body.start_time-1+req.body.hours); i++) {
				// 						slot[i] = true
				// 					}
				// 					found.save();
				// 					res.redirect("/booking/" + newBooking._id + "/verify");
				// 				}
				// 			});
				// 		}
				// 	});
				// }
<!--  -->
				// else if(req.body.vehicle_category === "4w") {
				// 	found.slots_4w.forEach(function(slot) {
				// 		var check = false;
				// 		for(var i=req.body.start_time-1; i<=(req.body.start_time-1+req.body.hours); i++) {
				// 			if(slot[i] === true)
				// 				check = true;
				// 				break;
				// 		}
				// 		if(check === false) {
				// 			Bookings.create({
				// 				mall_name: req.body.mall_name,
				// 				vehicle_type: req.body.vehicle_category,
				// 				start: st,
				// 				end_time: end,
				// 				reg_no: req.body.reg_number,
				// 				contact: req.body.contact,
				// 				price: Price,
				// 				grandtotal: gt
				// 			}, function(err, newBooking) {
				// 				if(err) {
				// 					console.log(err);
				// 					res.redirect("/");
				// 				}
				// 				else {
				// 					for(var i=req.body.start_time-1; i<(req.body.start_time-1+req.body.hours); i++) {
				// 						slot[i] = true;
				// 					}
				// 					found.save();
				// 					res.redirect("/booking/" + newBooking._id + "/verify");
				// 				}
				// 			});
				// 		}
				// 	});
				// }