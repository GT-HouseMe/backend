const Internship = require('../models/Internship.js');
const express = require('express');
const router = express.Router();

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

  module.exports = router;