const Listing = require('../models/Listing.js');
const express = require('express');
const router = express.Router();

router.post('/', async (request, response) => {
  try {
    if (
      !request.body.location ||
      !request.body.rent ||
      !request.body.startDate ||
      !request.body.endDate ||
      !request.body.description
    ) {
      return response.status(400).send({
        message: 'Send all required fields: location, rent, start date, end date, and description',
      });
    }
    const newListing = {
        location: request.body.location,
        rent: request.body.rent,
        startDate: request.body.startDate,
        endDate: request.body.endDate,
        description: request.body.description
    };

    const listing = await Listing.create(newListing);

    return response.status(201).send(listing);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

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

// Route for Getting One Book from database by its id
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

// Route for Updating a Book identified by its id
router.put('/:id', async (request, response) => {
  try {
    if (
        !request.body.location ||
        !request.body.rent ||
        !request.body.startDate ||
        !request.body.endDate ||
        !request.body.description
    ) {
      return response.status(400).send({
        message: 'Send all required fields: location, rent, start date, end date, and description',
      });
    }

    const { id } = request.params;

    const result = await Listing.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Listing not found' });
    }

    return response.status(200).send({ message: 'Listing updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Deleting a book identified by its id
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Listing.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Listing not found' });
    }

    return response.status(200).send({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

module.exports = router;