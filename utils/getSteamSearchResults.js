import axios from 'axios';
import { load } from 'cheerio';

const getSteamSearchResults = async (search) => {
  const data = (
    await axios.get(`https://store.steampowered.com/search/?term=${search}`)
  ).data;

  const $ = load(data);
  const results = [];

  $('[data-ds-appid]').each((i, item) => {
    const title = $(item).find('.title').text().trim();
    const price = $(item).find('.discount_final_price').text().trim();
    results.push({ title, price });
  });

  return results;
};

export default getSteamSearchResults;
