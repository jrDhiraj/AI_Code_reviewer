const express = require('express');
const app = express();
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');

app.get('/', (req, res)=>{
    res.send('Hello World!')
})

app.use(cors()) // Enable CORS for all routes

app.use(express.json()) // Middleware to parse JSON request body

app.use("/api/v1/ai", aiRoutes)
module.exports = app;