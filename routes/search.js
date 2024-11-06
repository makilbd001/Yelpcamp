const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { validateSearch } = require('../middleware');

router.get('/', validateSearch, catchAsync(async (req, res) => {
    const { searchTerm } = req.query;

    if (searchTerm) {
        // Use regex for case-insensitive search
        const campgrounds = await Campground.find({
            title: new RegExp(searchTerm, 'i')
        });

        if (campgrounds.length === 0) {
            req.flash('error', `No campgrounds found for "${searchTerm}"`);
            return res.redirect('/campgrounds');
        }

        res.render('campgrounds/index', { campgrounds });
    } else {
        const campgrounds = await Campground.find({});
        res.render('campgrounds/index', { campgrounds });
    }
}));


module.exports = router;
