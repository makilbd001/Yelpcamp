const express = require('express');
const router = express.Router({ mergeParams: true });
const {validateReview , isLoggedIn, isReviewAuthor }= require('../middleware');
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

router.get('/:reviewId/edit', isLoggedIn, isReviewAuthor, catchAsync(reviews.renderEditReviewForm));

// Route to handle the edit logic
router.put('/:reviewId', isLoggedIn, isReviewAuthor, validateReview, catchAsync(reviews.editReview));



module.exports = router;