import express from 'express';
//Import express from the express module
import gamesRouter from './routes/gamesRouter.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const app = express();
// App take everything from express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', gamesRouter);

app.get('/', (request, response) => {
    return response.send('Welcome to the Games API');
});

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
    }
);
// the method listen is used t start our server

