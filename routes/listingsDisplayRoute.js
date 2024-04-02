const Listing = require('../models/Listing.js');
const express = require('express');
const router = express.Router();

// Route to get all listings from our database
router.get('/', async (request, response) => {
    try {
        const listings = await Listing.find({});

        return response.status(200).json({
            count: listings.length,
            data: listings,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to only get one listing by its ID from our database
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const listing = await Listing.findById(id);

        return response.status(200).json(listing);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting all listings from database by its location
router.get('/location/:location', async (request, response) => {
    try {
        const { location } = request.params;

        const listings = await Listing.find({ location: location });

        return response.status(200).json({
            count: listings.length,
            data: listings,
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for filtering listings by price
router.get('/price/:price', async (request, response) => {
    try {
        const { price } = request.params;

        const listings = await Listing.find({ rent: { $lte: price } });

        return response.status(200).json({
            count: listings.length,
            data: listings,
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for filtering listings by start and end date
router.get('/date/:startDate/:endDate', async (request, response) => {
    try {
        const { startDate, endDate } = request.params;

        // Query listings with start dates less than or equal to startDate
        // and end dates greater than or equal to endDate
        const listings = await Listing.find({
            startDate: { $lte: startDate },
            endDate: { $gte: endDate }
        });

        return response.status(200).json({
            count: listings.length,
            data: listings,
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

module.exports = router;
