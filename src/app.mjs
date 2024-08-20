import express from 'express';
import path from 'path';
import hbs from 'hbs';
import { geocode } from './utils/geocode.mjs';
import { forecast } from './utils/forecast.mjs';


const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const __dirname = import.meta.dirname;
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ahmad Piran'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ahmad Piran'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help From a Dynamic file',
        name: 'Ahmad Piran'
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;

    if (!address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            if (!forecastData) {
                return res.send({
                    error: 'No forecast data returned.'
                });
            }

            const { temperature, weather_description } = forecastData;

            res.send({
                location,
                temperature,
                weather: weather_description
            });
        });
    });
});


app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Ahmad Piran',
        title: 'help404!',
        errorMessage: 'Help article not Found!'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Ahmad Piran',
        title: '404!',
        errorMessage: 'Page not found!'
    });
});

app.listen(port, () => {
    console.log(`Starting server on localhost at port ${port}`);
});