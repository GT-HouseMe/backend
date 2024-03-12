const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

const userRoute = require('./routes/authRoute.js')
const booksRoute = require('./routes/booksRoute.js')
const internshipsRoute = require('./routes/internshipsRoute.js')
const listingsRoute = require('./routes/listingsRoute.js')
const internshipsDisplayRoute = require('./routes/internshipsDisplayRoute.js')
const listingsDisplayRoute = require('./routes/listingsDisplayRoute.js')

const app = express()
app.use(cors())

app.use(express.json())

app.use('/auth', userRoute);
// app.use('/books', booksRoute);
app.use('/internshipsDisplay', internshipsDisplayRoute);
app.use('/listingsDisplay', listingsDisplayRoute);

app.use('/internships', internshipsRoute)
app.use('/listings', listingsRoute);

app.get('/', (req, res) => {
    res.status(200).json({"message":"hello!"})
})

const port = process.env.PORT || 3000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('App connected to database and');
        app.listen(port, () => {
            console.log(`listening on localhost:${port}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })
