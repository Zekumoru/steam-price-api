import express from 'express';
import getSteamTitlesPrices from '../utils/getSteamTitlesPrices.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(400).json({
    success: false,
    message: 'GET requests are not supported',
  });
});

router.post('/', async (req, res) => {
  const { titles } = req.body;

  if (titles == null) {
    res.status(400).json({
      success: false,
      message: 'Missing data to process',
    });
    return;
  }

  res.json({
    success: true,
    items: await getSteamTitlesPrices(titles),
  });
});

export default router;
