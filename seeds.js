var Campground  = require("./models/campground");
var Comment     = require("./models/comment");
var User        = require("./models/user");

// var admin = {
//     username: "admin",
//     password: "12345"
// }
var seeds = [
    {
       name: "West Wolf",
       image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg",
       description:"blah blah blah"
    },
    {
       name: "East Wood",
       image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
       description:"blah blah blah"   
    },
    {
       name: "North Banana",
       image:"https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
       description:"blah blah blah"   
    },
    {
       name: "South Beauty",
       image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
       description:"blah blah blah"   
    }
]

function seedDB() {
    // User.create(admin, function(err) {
    //     if (err) {
    //         console.log(err);
    //     }
    // });
    Comment.remove({}, function(err) {
        
    });
    User.remove({}, function(err) {
        
    });
    Campground.remove({}, function(err) {
        // if (err) {
        //     console.log(err);
        // } else {
        //     console.log("removed campgrounds");
        // }
        // seeds.forEach(function(seed) {
        //     Campground.create(seed, function(err, camp){
        //         if(err) {
        //             console.log(err);
        //         } else {
        //             console.log("added a camp!");
        //             Comment.create(
        //                 {
        //                     text: "Good camp! But without any internet, maybe I'm too greedy:)",
        //                     author:"Arui"
        //                 }, function(err, comment) {
        //                     if(err) {
        //                         console.log(err);
        //                     } else {
        //                         camp.comments.push(comment);
        //                         camp.save();
        //                         console.log("Added comment to a camp!");
        //                     }
        //             });
        //         }
        //     });
        // });
    });
};

module.exports = seedDB;