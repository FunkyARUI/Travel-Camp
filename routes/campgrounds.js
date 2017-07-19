var express =require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var geocoder = require("geocoder");

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


router.get("/campgrounds",function(req, res) {
    // Campground.find({},function(err, allCampgrounds){
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         res.render("campgrounds/index", {campgrounds: allCampgrounds});
    //     }
    // })
    if(req.query.search && req.xhr) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
        Campground.find({name: regex}, function(err, allCampgrounds){
            if(err){
               console.log(err);
            } else {
                res.status(200).json(allCampgrounds);
                // res.status(200).render("campgrounds/index", {campgrounds: allCampgrounds, page: 'campgrounds'});
            }
        });
    } else {
        // Get all campgrounds from DB
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            } else {
                if(req.xhr) {
                    res.json(allCampgrounds);
                } else {
                    res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
                }
            }
        });
    }
});

router.post("/campgrounds", middleware.isLoggedIn, function(req, res) {
    var name = req.body.campName;
    var url = req.body.campUrl;
    var desc = req.body.campDesc;
    var price = req.body.campPrice;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    geocoder.geocode(req.body.location, function (err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newCamp = {name: name, image: url, description: desc, price: price, author:author, location: location, lat: lat, lng: lng};
        Campground.create(newCamp, function(err, Camp) {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/campgrounds");
            }
        });
    })
});

router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

router.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground:foundCampground}); 
        }
    });
});

//edit 
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {camp: foundCampground});
    });
});

// deal with the put request
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
    geocoder.geocode(req.body.editedCamp.location, function (err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var editedCamp = req.body.editedCamp;
        editedCamp.lat = lat;
        editedCamp.lng = lng;
        console.log(data.results[0].geometry.location);
        console.log(lat);
        console.log(editedCamp);
        Campground.findByIdAndUpdate(req.params.id, editedCamp, function(err, UpdatedCamp){
            if (err) {
                console.log(err);
                res.redirect("/campgrounds");
            } else {
                res.redirect("/campgrounds/" + req.params.id);
            }
        })
    })
});

//delete
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;