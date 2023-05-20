// For a GET request using the app.get() method:
const express = require('express')
const app = express()

app.get('/', function(req, res) {
    res.send('Hello Sir')
})

// GET /api/notes should read the db.json file and return all saved notes as JSON.
