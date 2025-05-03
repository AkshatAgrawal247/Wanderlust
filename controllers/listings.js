const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner"); // Populate reviews and owner fields
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/show", { listing, mapToken: process.env.MAP_TOKEN });
};

module.exports.createListing = async (req, res, next) => {
  let response =  await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
        .send()
        
  const data = req.body.listing;
  let url = req.file.path; // Get the URL from the uploaded file
  let filename = req.file.filename; // Get the filename from the uploaded file
  // Set a default image if none is provided
  if (!data.image || data.image.trim() === "") {
    data.image =
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1170&auto=format&fit=crop";
  }

  const newListing = new Listing(data);
  newListing.owner = req.user._id; // Set the owner to the current user
  newListing.image = { url, filename }; // Set the image field with the URL and filename
  newListing.geometry = response.body.features[0].geometry; // Set the geometry field with the geocoding response
  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "Successfully created a new listing!");
  res.redirect("/listings");
};


module.exports.index = async (req, res) => {
  const { search } = req.query; // Get the search query from the request
  let allListings;

  if (search) {
    // Use a case-insensitive regex to search for listings by title or location
    const regex = new RegExp(search, "i");
    allListings = await Listing.find({
      $or: [{ title: regex }, { location: regex }],
    });
  } else {
    allListings = await Listing.find({});
  }

  res.render("listings/index", { allListings });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url; // Store the original image URL
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250"); // Modify the URL to get the original image size
  res.render("listings/edit", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  
  if(typeof req.file !== "undefined") {
  let url = req.file.path; // Get the URL from the uploaded file
  let filename = req.file.filename; // Get the filename from the uploaded file
  listing.image = { url, filename }; // Set the image field with the URL and filename
  await listing.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndDelete(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
