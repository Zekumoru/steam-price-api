import getSteamSearchResults from './getSteamSearchResults.js';

const getSteamPrice = async (title) => {
  const searchResults = await getSteamSearchResults(title);
  let price = 'Unavailable';

  for (let i = 0; i < searchResults.length; i++) {
    const searchResult = searchResults[i];

    if (title.toLowerCase() === searchResult.title.toLowerCase()) {
      price = searchResult.price;
      break;
    }
  }

  return price;
};

export default getSteamPrice;
