var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js")

//INDEX - Display a list of all campgrounds
router.get("/", function(req, res){
                                    //name: object we want to passs in
        // res.render("campgrounds", {campgrounds: campgrounds});
        // campgrounds from db
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            } else {
                res.render("campgrounds/index", {campgrounds: allCampgrounds});
                }
        });
});

//CREATE - Add a new campground to the DB
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author ={
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price:price, image:image, description: desc, author:author};
    //create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            req.flash("error", "Ops, something went wrong");
            res.redirect("back");
        } else{
            req.flash("success", "You've created a campground!");
            res.redirect("/campgrounds");
        }
    });
});

//NEW - Display form to make a new item
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || foundCampground == undefined){
            console.log(err);
            req.flash("error", "404 Error: Campground not found.");
            return res.redirect("/campgrounds");
        } else{
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || foundCampground == undefined){
                console.log(err);
                req.flash("error", "404 Error: Campground not found.");
                return res.redirect("/campgrounds");
            } else {
                res.render("campgrounds/edit", {campground: foundCampground});
            }
    });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground //params: what we're finding, data to update
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            req.flash("error", "404 Error: Campground not found.");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "You've successfully updated your campground!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    //redirect to showpage
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "404 Error: Campground not found.");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "You've successfully deleted your campground!");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;