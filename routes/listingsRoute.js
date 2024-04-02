const Listing = require('../models/Listing.js');
const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' })
const router = express.Router();

// Route to save new listing to our database 
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
        message: 'Send all required fields: location, rent, startDate, endDate, description',
      });
      
      }
    const newListing = {
        location : request.body.location,
        rent : request.body.rent,
        startDate : request.body.startDate,
        endDate : request.body.endDate,
        description : request.body.description,
        createdBy : request.user.userId
    };

    const listing = await Listing.create(newListing);

    return response.status(201).send(listing);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


// Route to get all listings from our database
router.get('/', async (request, response) => {
  try {
    const listings = await Listing.find({ createdBy: request.user.userId });

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

    const listing = await Listing.findOne({_id: id, createdBy: request.user.userId});

    return response.status(200).json(listing);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to update a listing by its id
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
        message: 'Send all required fields: location, rent, startDate, endDate, description',
      });
    }

    const { id } = request.params;

    const result = await Listing.findOneAndUpdate({_id: id, createdBy: request.user.userId}, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Listing not found' });
    }

    return response.status(200).send({ message: 'Listing updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Delete a listing by id 
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Listing.findOneAndDelete({_id: id, createdBy: request.user.userId});

    if (!result) {
      return response.status(404).json({ message: 'Listing not found' });
    }

    return response.status(200).send({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.post('/upload_photos', async (request, response) => {
  try {
    upload.array(request.file);
    return response.status(200).send({ message: 'Photos uploaded successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
})

module.exports = router;

