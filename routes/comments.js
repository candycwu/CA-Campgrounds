var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/");

//NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function (err, campground){
        if(err){
            req.flash("error", "You need to be logged in to do that.");
        } else {
            res.render("comments/new", {campground: campground});
        }
    });

});

//CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", "You need to be logged in to do that.");
            res.redirect("/camogrounds");
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Ops, something went wrong.");
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    //push and connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "You've added your comment!");
                    //redirect back to show campground showpage
                    res.redirect("/campgrounds/"+ campground._id);
                }
            });
        }
    });
});

//EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            req.flash("error", "Ops, something went wrong.");
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

//UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            req.flash("error", "Ops, something went wrong.");
            res.redirect("back");
        } else {
            req.flash("success", "You've successfully updated your comment!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           req.flash("error", "You don't have permission to do that.");
           res.redirect("back");
       }else{
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

module.exports = router;