// an example set of post/get/put/delete routes that is not relevant to this project
const Listing = require('../models/Listing.js');
const express = require('express');
const router = express.Router();

// Route for saving a new Book to database
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
        startDate: new Date(request.body.startDate),
        endDate: new Date(request.body.endDate),
        description: request.body.description
    };

    const listing = await Listing.create(newListing);

    return response.status(201).send(listing);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Getting All Books from the database
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
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

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Updating a Book identified by its id
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Deleting a book identified by its id
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

module.exports = router;