const express = require('express')
const User = require('../models/User.js');
const router = express.Router();
const jwt = require('jsonwebtoken')

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
        const { name, email, password } = request.body;
        const userFound = await User.findOne({ email });
        const token = jwt.sign({ userId: user._id, name: user.name}, process.env.JWT_Secret, {
            expiresIn: '30d'
        });
        return response.status(200).json({ user: {name: user.name}, token});
      } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
      }
});

router.post('/login', async(request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.email ||
      !request.body.password ||
      !request.body.description
    ) {
      return response.status(400).send({
        message: 'Send all required fields: name, email, password, description',
      });
    }

    const { name, email, password } = request.body;
    const user = await User.findOne({ email });

    if (user.password == password){
      const token = jwt.sign({ userId: user._id, name: user.name}, process.env.JWT_Secret, {
        expiresIn: '30d'
      });
      return response.status(201).json({
        user: {name: user.name},
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