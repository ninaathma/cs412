const express = require('express');
const router = express.Router();
const request = require('request');
const fetch = require('node-fetch');

const apiKey = '6f3f7552c9msh8236d150d7b3cf7p184044jsnb274092385a4'; // Replace with your API key

// Route with Promises
router.post('/form', (req, res) => {
    const { search } = req.body;

    if (!search) {
        return res.status(400).send('Please enter a city.');
    }

    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        qs: { q: search },
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
    };

    // Wrap the request in a Promise
    const apiPromise = new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });

    apiPromise
        .then((data) => {
            res.render('result', { data });
        })
        .catch((error) => {
            res.status(500).send('Error fetching data');
        });
});

// Route with async/await
router.post('/asyncawait', async (req, res) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
    };

    try {
        const response = await fetch(
            'https://weatherapi-com.p.rapidapi.com/current.json?q=53.1,-0.13',
            options
        );
        const data = await response.json();
        res.render('result', { data });
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

// Route with callback
router.post('/callback', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        qs: { q: '53.1,-0.13' },
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
    };

    // Using callback for the async API call
    request(options, (error, response, body) => {
        if (error) {
            res.status(500).send('Error fetching data');
        } else {
            res.render('result', { data: body });
        }
    });
});
module.exports = router;
