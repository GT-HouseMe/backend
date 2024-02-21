
const Internship = require('../models/Internship.js');
const express = require('express');
const router = express.Router();

// Route for saving a new Internship to database
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.company ||
      !request.body.location ||
      !request.body.startDate ||
      !request.body.endDate ||
      !request.body.description
    ) {
      return response.status(400).send({
        message: 'Send all required fields: company, location, startDate, endDate, description',
      });
    }
    const newInternship = {
        company : request.body.company,
        location : request.body.location,
        startDate : request.body.startDate,
        endDate : request.body.endDate,
        description : request.body.description,
    };

    const internship = await Internship.create(newInternship);

    return response.status(201).send(internship);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Getting All Internships from the database
router.get('/', async (request, response) => {
  try {
    const internships = await Internship.find({});

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

    const internship = await Internship.findById(id);

    return response.status(200).json(internship);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Updating an Internship identified by its id
router.put('/:id', async (request, response) => {
  try {
    if (
        !request.body.company ||
        !request.body.location ||
        !request.body.startDate ||
        !request.body.endDate ||
        !request.body.description
    ) {
      return response.status(400).send({
        message: 'Send all required fields: company, location, startDate, endDate, description',
      });
    }

    const { id } = request.params;

    const result = await Internship.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Internship not found' });
    }

    return response.status(200).send({ message: 'Internship updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Deleting an Internship identified by its id
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Internship.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Internship not found' });
    }

    return response.status(200).send({ message: 'Internship deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

module.exports = router;