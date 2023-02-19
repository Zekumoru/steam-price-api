import express from 'express';
import GamePriceModel from '../models/game-price.js';
import getSteamTitlePrice from '../utils/getSteamTitlePrice.js';

const router = express.Router();

const getGamePriceFromDB = async (title) => {
  return await GamePriceModel.findOne({ title });
};

const saveGamePriceToDB = async (steamPrice) => {
  const { currency, ...price } = steamPrice.price;

  const gamePrice = new GamePriceModel({
    title: steamPrice.title,
    price: {
      value: price.value,
      text: price.text,
      original_string: price.original_string,
      currency: {
        symbol: currency.symbol,
        placement: currency.placement,
      },
    },
  });

  await gamePrice.save();
};

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

  try {
    const steamPrices = await Promise.all(
      titles.map((title) => {
        return (async () => {
          const gamePrice = await getGamePriceFromDB(title);
          if (gamePrice != null) {
            console.log('Fetched from DB:', title);
            return gamePrice;
          }

          const steamPrice = await getSteamTitlePrice(title);
          await saveGamePriceToDB(steamPrice);
          console.log('Saved to DB', title);
          return steamPrice;
        })();
      })
    );

    res.status(201).json({
      success: true,
      items: steamPrices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});

export default router;
