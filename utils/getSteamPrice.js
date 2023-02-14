import extractPrices from './extract-prices/extractPrices.js';
import getSteamSearchResults from './getSteamSearchResults.js';

const getSteamPrice = async (title) => {
  const searchResults = await getSteamSearchResults(title);
  const returnObj = {
    value: 0,
    currency: {},
    text: undefined,
    original_string: undefined,
  };

  let priceString = 'Unavailable';
  for (let i = 0; i < searchResults.length; i++) {
    const searchResult = searchResults[i];

    if (title.toLowerCase() === searchResult.title.toLowerCase()) {
      priceString = searchResult.price;
      break;
    }
  }

  returnObj.original_string = priceString;

  if (priceString.match(/free/i)) {
    returnObj.value = 0;
    returnObj.text = 'Free to Play';
  } else if (priceString.match(/unavailable/i) || priceString === '') {
    returnObj.value = -1;
    returnObj.text = 'Unavailable';
  } else {
    const extracted = extractPrices(priceString);
    returnObj.value = extracted[0][0];
    returnObj.currency = extracted[1];
    returnObj.text = extracted[2][0];
  }

  return returnObj;
};

export default getSteamPrice;
