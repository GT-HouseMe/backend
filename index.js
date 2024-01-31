const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({"message":"hello!"})
})

app.listen(3000, () => {
    console.log("listening on localhost:3000")
})
