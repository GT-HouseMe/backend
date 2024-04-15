const express = require('express')
const User = require('../models/User.js');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.get('/details/:id', async(request, response) => {
  try {
      const { id } = request.params;

      const user = await User.findById(id);

      return response.status(200).json(user);
  } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
  }
});

router.post('/register', async(request, response) => {
    try {
        if (
          !request.body.name ||
          !request. body.email ||
          !request.body.password ||
          !request.body.description
        ) {
          return response.status(400).send({
            message: 'Send all required fields: name, email, password, description',
          });
        }
        const newUser = {
            name : request.body.name,
            email : request.body.email,
            password : request.body.password,
            description : request.body.description,
        };
        
        const user = await User.create(newUser);
        const token = jwt.sign({ userId: user._id, name: user.name}, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
        return response.status(200).json({ userId: user._id, token});
      } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
      }
});

router.post('/login', async(request, response) => {
  try {
    if (
      !request.body.email ||
      !request.body.password
    ) {
      return response.status(400).send({
        message: 'Send all required fields: email and password',
      });
    }

    const { email, password } = request.body;
    const user = await User.findOne({ email });

    if (user.password == password){
      const token = jwt.sign({ userId: user._id, name: user.name}, process.env.JWT_SECRET, {
        expiresIn: '30d'
      });
      return response.status(201).json({
        userId: user._id,
        token
      });
    } else{
      return response.status(400).send({
        message: 'Incorrect password',
      });
    }
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

module.exports = router;