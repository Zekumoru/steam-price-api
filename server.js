import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import router from './routes/router.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3010;

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.on('open', () => console.log('Connected to database'));

app.use(cors());

app.use(express.json());
app.use('/steam-price', router);

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
