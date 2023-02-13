import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import router from './routes/router.js';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use('/steam-price', router);

app.listen(8000, () => console.log('Server has started'));
