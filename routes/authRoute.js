const express = require('express')
const User = ('../models/User.js');
const router = express.Router();

router.post('/register', async(request, response) => {
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
        const newUser = {
            name : request.body.name,
            email : request.body.email,
            password : request.body.password,
            description : request.body.description,
        };
        
        const user = await User.create(newUser);
        const token = user.createJWT();
        return response.status(201).json({
          user: {name: user.name},
          token
        });
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
    

    const user = await User.create(newUser);
    const token = user.createJWT();
    return response.status(201).json({
      user: {name: user.name},
      token
    });
    return null;
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

module.exports = router;