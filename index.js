import express from 'express';
//Import express from the express module
import games from './data/games.js';

const app = express();
// App take everything from express

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (request, response) => {
    return response.end('Welcome to my games API');
});
// Our first route that takes the path as first parameters, request and response and returns a response

app.get('/games', (request, response) => {
    return response.json(games);
});
// Route to get all games

app.get('/games/:id', (request, response) => {
    const gamesID = request.params.id;
    // I save onto a variable the value of the params
    const gamesByID = games.find(game => game.id == gamesID);
    // I search in the array where i do have an object with his ID matching the request.params.id 
    if (!gamesByID) {
        return response.status(404).json({ message: 'Game not found' });
    }
    // If the game is not found, I return a 404 status and a message
    return response.status(200).json(gamesByID);
    //
});

app.post('/games', (request, response) => {
    const {title, genre } = request.body;
    if (!title , !genre) {
        return response.status(400).json({ message: 'Title and genre are required' });
    }
    const newGames = {
        id: games.length + 1,
        title,
        genre
    };
    games.push(newGames);
    return response.status(201).json(newGames);
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);
// the method listen is used t start our server

