const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const BASE_URL = 'https://poised-broad-koi.glitch.me';

// Helper function to forward response headers
const forwardResponseHeaders = (res, response) => {
    // Forward 'content-type' and other relevant headers
    res.setHeader('Content-Type', response.headers['content-type'] || 'application/json');
    if (response.headers['content-length']) {
        res.setHeader('Content-Length', response.headers['content-length']);
    }
    if (response.headers['content-disposition']) {
        res.setHeader('Content-Disposition', response.headers['content-disposition']);
    }
};

// GET Endpoint
app.get('/*', async (req, res) => {
    try {
        const url = `${BASE_URL}${req.originalUrl}`;
        const response = await axios.get(url, { params: req.query, responseType: 'arraybuffer' });
        
        // Forward the headers
        forwardResponseHeaders(res, response);

        // Send the response data
        res.status(response.status).send(Buffer.from(response.data));
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
        const response = await axios.post(url, req.body, { responseType: 'arraybuffer' });
        
        // Forward the headers
        forwardResponseHeaders(res, response);

        // Send the response data
        res.status(response.status).send(Buffer.from(response.data));
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
        
