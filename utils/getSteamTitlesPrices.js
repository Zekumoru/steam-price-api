import getSteamPrice from './getSteamPrice.js';

const getSteamTitlesPrices = async (titles) => {
  const items = [];
  const addItem = async (title) => {
    items.push({
      title,
      price: await getSteamPrice(title),
    });
  };

  await Promise.all(
    titles.map((title) => {
      return addItem(title);
    })
  );

  return items;
};

export default getSteamTitlesPrices;
