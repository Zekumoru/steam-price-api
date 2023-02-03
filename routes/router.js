import express from 'express';
import getSteamPrice from '../utils/getSteamPrice.js';

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

  const items = [];
  for (let i = 0; i < titles.length; i++) {
    const title = titles[i];
    items.push({
      title,
      price: await getSteamPrice(title),
    });
  }

  res.json({
    success: true,
    items,
  });
});

export default router;
