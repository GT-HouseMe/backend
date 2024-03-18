const { User } = require('../models/User.js');
const jwt = require('jsonwebtoken');

const auth = async(request, response, next) => {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response.status(400).send({
            message: 'No authentication token found'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        request.user = { userId: payload.userId, name: payload.name };
        next();
    } catch (error) {
        return response.status(500).send({ message: error.message });
    }
}

module.exports = auth;