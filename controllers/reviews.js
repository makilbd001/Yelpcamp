const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/campgrounds/${id}`);
}

module.exports.renderEditReviewForm = async (req, res) => {
    const { id, reviewId } = req.params;
    const campground = await Campground.findById(id);
    const review = await Review.findById(reviewId);
    if (!campground || !review) {
        req.flash('error', 'Cannot find that review or campground!');
        return res.redirect(`/campgrounds/${id}`);
    }
    res.render('campgrounds/reviewedit', { campground, review });
};

// Controller to update the review
module.exports.editReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndUpdate(reviewId, {
        body: req.body.review.body,
        rating: req.body.review.rating,
    });
    req.flash('success', 'Successfully updated the review!');
    res.redirect(`/campgrounds/${id}`);
};