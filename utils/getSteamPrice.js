import extractPrices from './extract-prices/extractPrices.js';
import getSteamSearchResults from './getSteamSearchResults.js';

const getSteamPrice = async (title) => {
  const searchResults = await getSteamSearchResults(title);
  let priceString = 'Unavailable';

  for (let i = 0; i < searchResults.length; i++) {
    const searchResult = searchResults[i];

    if (title.toLowerCase() === searchResult.title.toLowerCase()) {
      priceString = searchResult.price;
      break;
    }
  }

  if (priceString.match(/free/i)) {
    return {
      value: 0,
    };
  }

  if (priceString.match(/unavailable/i)) {
    return {
      value: -1,
    };
  }

  const extracted = extractPrices(priceString);
  return {
    value: extracted[0][0],
    currency: extracted[1],
  };
};

export default getSteamPrice;
