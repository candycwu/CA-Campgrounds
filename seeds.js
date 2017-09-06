var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data=[
    {
        name: "Crystal Cove State Park",
        image: "https://static1.squarespace.com/static/53cb0416e4b01d2bd00e2dd1/540fe42ce4b015076b6f4bef/540fe42ce4b015076b6f4bf0/1410327597220/38709.jpg",
        description: "Crystal Cove State Park is one of Orange County’s largest remaining examples of open space and natural seashore. It features 3.2 miles of beach, 2,400 acres of backcountry wilderness and an offshore underwater area. The park also features the federally listed Historic District, an enclave of 46 vintage rustic coastal cottages originally built as a seaside colony in the 1930’s & 40’s and nestled around the mouth of Los Trancos Creek."
    },
    {
        name: "Big Basin Redwoods State Park",
        image: "https://media.mnn.com/assets/images/2013/05/big_basin_father_tree.jpg.560x0_q80_crop-smart.jpg",
        description: "Traffic and Parking Delays at Big Basin. Due to high visitation during the summer season, you should expect delays when arriving at Big Basin Redwoods State"
    },
    {
        name: "Sequoia National Park",
        image: "https://www.nationalparks.org/sites/default/files/styles/wysiwyg_full_1x/public/shutterstock_64599847_0.jpg?itok=TRKRgdMp",
        description: "Sequoia National Park is a national park in the southern Sierra Nevada east of Visalia, California, in the United States. It was established on September 25, 1890."
    }
    
];

function seedDB(){
    //Remove all campgrouds
    Campground.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         console.log("removed all campgrounds!");
    //     }
    
    // });
    // //Add a few campgrounds
    // data.forEach(function(seed){
    //     Campground.create(seed, function(err, campground){
    //         if(err){
    //             console.log(err);
    //         } else {
    //             console.log("campground added.");
    //             //Add a few comments
    //             Comment.create(
    //                 {
    //                     text: "This place was fantastic, except my phone couldn't get connection",
    //                     author: "Hermione"
    //                 }, function(err, comment){
    //                     if(err){
    //                         console.log(err);
    //                     } else {
    //                         campground.comments.push(comment);
    //                         campground.save();
    //                         console.log("comment created");
    //                     }
    //                 });
    //         }
    //     });
    });
}

module.exports = seedDB;
