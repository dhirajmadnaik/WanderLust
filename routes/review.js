const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");
const {
  validateReview,
  isLogedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

// Review - add route
router.post(
  "/",
  isLogedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// Review - remove route
router.delete(
  "/:reviewID",
  isLogedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
