import { response, Router } from 'express';
import games from '../data/games.js';

const gamesRouter = Router();

gamesRouter.get('/games', (request, response) => {
    return response.json(games);
});
// Route to get all games

gamesRouter.get('/games/:id', (request, response) => {
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

gamesRouter.post('/games', (request, response) => {
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

gamesRouter.put('/games/:id', (req , res) => {
    const {id} = req.params
    const {title, genre} = req.body
    if (!title || !genre) {
        return res.status(400).json({ message: 'Games not found' });
    }
    let gamesByID = games.find(game => game.id === parseInt(id));
    gamesByID = {
        id: gamesByID.id,
        title: title || gamesByID.title,
        genre: genre || gamesByID.genre
    }
    return res.status(200).json(gamesByID);
});

gamesRouter.delete('/games/:id', (req, res) => {
    const {id} = req.params;
    try{
        let gamesByID = games.find(game => game.id === parseInt(id));
        if (!gamesByID) {
            return res.status(404).json({ message: 'Game not found' });
        }
        const gamesIndex = games.indexOf(gamesByID);
        games.splice(gamesIndex, 1);
        return res.status(202).json({ message: 'Game has been deleted' });
    } 
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default gamesRouter;