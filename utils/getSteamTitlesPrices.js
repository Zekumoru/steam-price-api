import getSteamPrice from './getSteamPrice.js';
import getSteamTitlePrice from './getSteamTitlePrice.js';

const getSteamTitlesPrices = async (titles) => {
  return await Promise.all(
    titles.map((title) => {
      return (async () => await getSteamTitlePrice(title))();
    })
  );
};

export default getSteamTitlesPrices;
