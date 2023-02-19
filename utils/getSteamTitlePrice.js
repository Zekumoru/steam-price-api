import getSteamPrice from './getSteamPrice.js';

const getSteamTitlePrice = async (title) => {
  return {
    title,
    price: await getSteamPrice(title),
  };
};

export default getSteamTitlePrice;
