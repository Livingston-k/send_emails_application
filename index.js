const express = require('express')
const app = express()
require("dotenv").config();
const PORT = 3000

app.get('/', (req, res) => {
    res.send("Hello")
})
app.post('/send', (req, res) => {
    res.send(res.body)
})
app.listen(PORT, () => {
    console.log(`Server is running on port http://127.0.0.1:${PORT}`)
})