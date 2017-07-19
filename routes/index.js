var express =require("express");
var passport = require("passport");
var router = express.Router();
var User = require("../models/user");

router.get("/", function(req, res) {
   res.render("landing"); 
});

router.get("/register", function(req, res) {
    res.render("register"); 
});

router.post("/register", function(req, res) {
    var newUser = {username:req.body.username};
    User.register(newUser, req.body.password, function(err, user){
       if(err) {
           req.flash("error", err.message);
           return res.redirect("/register");
       } else {
           passport.authenticate("local")(req, res, function() {
               req.flash("success", "Welcome to YelpCamp, " + user.username);
               res.redirect("/campgrounds"); 
           });
       }
    });
});

// login form
router.get("/login", function(req, res) {
   res.render("login"); 
});

router.post("/login", passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: 'Welcome to YelpCamp!'
    }), function(req, res) {
});

//log out
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;