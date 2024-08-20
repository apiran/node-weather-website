import dotenv from 'dotenv';
import axios from 'axios';

// Load environment variables from .env file
dotenv.config();

// Load environment variables
const WEATHERAPI_KEY = process.env.WEATHERAPI_KEY;
const WEATHERAPI_ENDPOINT = 'https://api.weatherstack.com/current';

export const forecast = (latitude, longitude, callback) => {
    axios.get(WEATHERAPI_ENDPOINT, {
        params: {
            access_key: WEATHERAPI_KEY,
            query: `${latitude},${longitude}`
        }
    })
    .then(response => {
        const { current } = response.data;
        if (current) {
            const { temperature, weather_descriptions } = current;
            const weather_description = weather_descriptions[0];           

            callback(null, { temperature, weather_description });
        } else {
            callback('No results found!');
        }
    })
    .catch(error => {
        console.error('Error making the forecast request:', error);
        callback('Error making the forecast request');
    });
};
