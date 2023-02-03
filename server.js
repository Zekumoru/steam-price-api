import bodyParser from 'body-parser';
import express from 'express';
import router from './routes/router.js';

const app = express();

app.use(bodyParser.json());
app.use('/steam-price', router);

app.listen(3000, () => console.log('Server has started'));
