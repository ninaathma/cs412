const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config'); // Adjust the path as needed

const apiKey = config.apiKey;

router.post('/promise', handleWeatherRequest);
router.post('/asyncawait', handleWeatherRequestAsyncAwait);
router.post('/callback', handleWeatherRequestCallback);

function handleWeatherRequest(req, res) {
    const { cityPromise } = req.body;
    makeApiRequestAndRender(res, cityPromise);
}

async function handleWeatherRequestAsyncAwait(req, res) {
    const { cityAsyncAwait } = req.body;
    try {
        const response = await makeApiRequest(cityAsyncAwait);
        renderTemplateWithData(res, response);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
}

function handleWeatherRequestCallback(req, res) {
    const { cityCallback } = req.body;
    makeApiRequest(cityCallback)
        .then((response) => renderTemplateWithData(res, response))
        .catch(() => res.status(500).send('Error fetching data'));
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
