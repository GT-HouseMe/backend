const Internship = require('../models/Internship.js');
const express = require('express');
const router = express.Router();

// Route for Getting All Internships from the database with pagination
router.get('/', async (request, response) => {
    try {
        const page = parseInt(request.query.page) || 1; // Parse the page number from query parameter, default to 1 if not provided
        const limit = 10; // Number of results per page
        const startIndex = (page - 1) * limit;

        const internships = await Internship.find({}).skip(startIndex).limit(limit);

        return response.status(200).json({
            count: internships.length,
            data: internships,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Getting One Internship from database by its id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const internship = await Internship.findById(id).populate("createdBy");;

        return response.status(200).json(internship);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for filtering internships by start and end date
router.get('/date/:startDate/:endDate', async (request, response) => {
    try {
        const { startDate, endDate } = request.params;

        // Query internships with start dates greater than or equal to startDate
        // and end dates less than or equal to endDate
        const internships = await Internship.find({
            startDate: { $gte: startDate },
            endDate: { $lte: endDate }
        });

        return response.status(200).json({
            count: internships.length,
            data: internships,
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/location/:loc', async (request, response) => {
    try {
        const { loc } = request.params;

        const internships = await Internship.find({
            location: loc
        });

        return response.status(200).json({
            count: internships.length,
            data: internships,
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

module.exports = router;
