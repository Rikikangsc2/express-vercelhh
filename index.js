const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const BASE_URL = 'https://poised-broad-koi.glitch.me';

// GET Endpoint
app.get('/*', async (req, res) => {
    try {
        const url = `${BASE_URL}${req.originalUrl}`;
        const response = await axios.get(url, { params: req.query });
        res.status(response.status).send(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});

// POST Endpoint
app.post('/*', async (req, res) => {
    try {
        const url = `${BASE_URL}${req.originalUrl}`;
        const response = await axios.post(url, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});