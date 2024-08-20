import dotenv from 'dotenv';
import axios from 'axios';

// Load environment variables from .env file
dotenv.config();

// Load environment variables
const GEOCODEAPI_KEY = process.env.GEOCODEAPI_KEY;
const GEOCODE_ENDPOINT = 'https://api.opencagedata.com/geocode/v1/json';


export const geocode = (address, callback) => {
    axios.get(GEOCODE_ENDPOINT, { params: { key: GEOCODEAPI_KEY, q: address } })
    .then(response => {
        const { results } = response.data;
        if (results && results.length > 0) {
            const { lat: latitude, lng: longitude } = results[0].geometry;
            const { formatted: location } = results[0];

            callback(null, { latitude, longitude, location });
        } else {
            callback('No results found! Try another search');
        }
    })
    .catch(error => {
        console.error('Error making the geocode request:', error);
        callback('Error making the geocode request');
    });
};