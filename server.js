import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import router from './routes/router.js';
import apicache from 'apicache';

const app = express();
const cache = apicache.middleware;

app.use(cors());

app.use(cache('2 days'));
app.use(bodyParser.json());
app.use('/steam-price', router);

app.listen(3000, () => console.log('Server has started'));
