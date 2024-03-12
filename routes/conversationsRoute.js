const Conversation = require('../models/Conversation.js');
const express = require('express');
const router = express.Router();

// Route for creating a new conversation
router.post('/', async (request, response) => {
  try {
    const { members } = request.body;

    if (!members || members.length < 2) {
      return response.status(400).send({
        message: 'Send at least two members for the conversation',
      });
    }

    const newConversation = new Conversation({
      dateCreated: new Date(),
      members: members,
    });

    const conversation = await newConversation.save();

    return response.status(201).send(conversation);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting all conversations
router.get('/', async (request, response) => {
  try {
    const conversations = await Conversation.find({});

    return response.status(200).json({
      count: conversations.length,
      data: conversations,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting a conversation by its id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const conversation = await Conversation.findById(id);

    if (!conversation) {
      return response.status(404).json({ message: 'Conversation not found' });
    }

    return response.status(200).json(conversation);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for deleting a conversation by its id
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Conversation.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Conversation not found' });
    }

    return response.status(200).send({ message: 'Conversation deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

module.exports = router;
