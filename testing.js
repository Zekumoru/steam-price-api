import axios from 'axios';

(async () => {
  try {
    const prices = (
      await axios.post('http://194.163.190.50:3000/steam-price', {
        titles: [],
      })
    ).data;
    console.log(prices);
  } catch (e) {
    console.log(e.message);
  }
})();
