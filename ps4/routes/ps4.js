const express = require('express');
const router = express.Router();
const request = require('request');
const redis = require('redis');
const config = require('../config'); // Adjust the path as needed


const apiKey = config.apiKey;
const redisClient = redis.createClient();


router.post('/promise', async (req, res) => {
    const { cityPromise } = req.body;

    // Check if data is in the cache
    redisClient.get(cityPromise, async (err, cachedData) => {
        if (err) {
            console.error('Error accessing Redis cache:', err);
            return res.status(500).send('Error fetching data');
        }

        if (cachedData) {
            // Data found in cache, return it
            res.json({ data: JSON.parse(cachedData), fromCache: true });
        } else {
            // Data not in cache, make API request
            try {
                const apiResponse = await makeApiRequest(cityPromise);
                const responseData = JSON.parse(apiResponse);

                // Cache the response with a 15-second timeout
                redisClient.setex(cityPromise, 15, JSON.stringify(responseData));

                res.json({ data: responseData, fromCache: false });
            } catch (error) {
                res.status(500).send('Error fetching data');
            }
        }
    });
});
router.post('/asyncawait', handleWeatherRequestAsyncAwait);
router.post('/callback', handleWeatherRequestCallback);

function handleWeatherRequest(req, res) {
    const { cityPromise } = req.body;
    makeApiRequestAndRender(res, cityPromise);
}

function handleWeatherRequestAsyncAwait(req, res) {
    const { cityAsyncAwait } = req.body;
    try {
        makeApiRequest(cityAsyncAwait)
            .then((response) => sendJsonResponse(res, response))
            .catch(() => res.status(500).json({ error: 'Error fetching data' }));
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
}

function handleWeatherRequestCallback(req, res) {
    const { cityCallback } = req.body;
    makeApiRequest(cityCallback)
        .then((response) => sendJsonResponse(res, response))
        .catch(() => res.status(500).json({ error: 'Error fetching data' }));
}

function sendJsonResponse(res, data) {
    res.json({ data, fromCache: false });
}


function makeApiRequest(city) {
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        qs: { q: city },
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
    };

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
}

function makeApiRequestAndRender(res, city) {
    makeApiRequest(city)
        .then((response) => renderTemplateWithData(res, response))
        .catch(() => res.status(500).send('Error fetching data'));
}

function renderTemplateWithData(res, data) {
    res.render('result', { data });
}

module.exports = router;
