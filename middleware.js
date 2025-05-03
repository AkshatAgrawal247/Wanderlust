const Listing = require("./models/listing");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema} = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl; // Store the original URL in session 
        req.flash("error", "You must be signed in first!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
     if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl; // Make redirect URL available in views 
    }
    next();
};

module.exports.isOwner =async(req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// Middleware to validate listing data
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body); // Validate the data using Joi schema
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", "); // Extract error messages
        throw new ExpressError(400, errMsg); // If validation fails, throw an error
    } else {
        next(); // If validation passes, proceed to the next middleware
    }
};


module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body); // Validate the data using Joi schema
  if(error) {
    let errMsg = error.details.map(el => el.message).join(", "); // Extract error messages
       throw new ExpressError(400, errMsg ); // If validation fails, throw an error
      
    }
    else{
        next(); // If validation passes, proceed to the next middleware
       }};


  module.exports.isReviewAuthor =async(req, res, next) => {
        const {id, reviewId } = req.params;
        const review = await Review.findById(reviewId);
        if(!review.author.equals(res.locals.currUser._id)){
            req.flash("error", "You are not the author of this review!");
            return res.redirect(`/listings/${id}`);
        }
        next();
    };