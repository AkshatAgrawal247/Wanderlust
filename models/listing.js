const mongoose = require('mongoose');
const Review = require('./review.js');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
    //     type: String,
    //     default: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1170&auto=format&fit=crop"
    url: String,
    filename: String
    },
    price: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    geometry: {
        type: {
            type: String,  // Dont't do {location: { type: String }}. It causes problems
            // We are going to use this as a GeoJSON point
            enum: ['Point'],  //'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }

});

listingSchema.post("findOneAndDelete", async (listing)=> {
   if (listing) {
        await Review.deleteMany({
            _id: {
                $in: listing.reviews // Delete all reviews associated with the listing
            }});
} 
}
);

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;