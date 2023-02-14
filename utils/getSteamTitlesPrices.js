import getSteamPrice from './getSteamPrice.js';

const getSteamTitlesPrices = async (titles) => {
  return await Promise.all(
    titles.map((title) => {
      return (async () => ({
        title,
        price: await getSteamPrice(title),
      }))();
    })
  );
};

export default getSteamTitlesPrices;
