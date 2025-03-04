import express from 'express';
//Import express from the express module
import games from './data/games.js';

const app = express();
// App take everything from express


app.get('/', (request, response) => {
    return response.end('Welcome to my first API');
});
// Our first route that takes the path as first parameters, request and response and returns a response

app.get('/games', (request, response) => {
    return response.json(games);
});
// Route to get all games


app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);
// the method listen is used t start our server

