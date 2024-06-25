const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const { isLogedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index)) // Index route
  .post(
    isLogedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  ); // Create new listing route

// New route
router.get("/new", isLogedIn, listingController.rederNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) // Show route
  .put(
    isLogedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  ) // Update route
  .delete(isLogedIn, wrapAsync(listingController.deleteListing)); // Delete route

// Edit route
router.get("/:id/edit", isLogedIn, wrapAsync(listingController.renderEditForm));

module.exports = router;
