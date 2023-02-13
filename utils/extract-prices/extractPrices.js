const PRICE_REGEX = /[\d,.]+[,.]?\d*/g;

const fromPriceToNumber = (priceString) => {
  const normalized = priceString.replace(',', '.');
  return parseFloat(normalized);
};

const extractCurrencies = (string) => {
  return (
    [
      ...string
        // remove all prices with a placeholder
        .replaceAll(PRICE_REGEX, '[[price-placeholder]]')
        // remove any white spaces
        .replaceAll(' ', '')
        // using the placeholder, extract all everything
        // before, between, and after them
        .matchAll(
          /^(?:(?!\[\[price-placeholder\]\]).)*|(?<=\[\[price-placeholder\]\]).*?(?=(?:\[\[price-placeholder\]\]|$))/g
        ),
    ]
      // remove any empty string matches
      .filter((m) => m[0])
      // remove any regex bloat data (e.g. index of the match, etc.)
      .map((currencyString) => currencyString[0])
  );
};

const extractTexts = (string, currency) => {
  // this fixes an error with regex where it
  // doesn't match $ since it's a special character.
  // p.s. \\$ or [$] did not work to fix it!
  if (currency === '$') {
    string = string.replaceAll('$', '[[DOLLAR-SYMBOL]]');
    currency = '\\[\\[DOLLAR-SYMBOL\\]\\]';
  }

  const onLeft = new RegExp(`^${currency}`).test(string.trim());
  let pattern;

  if (onLeft) {
    pattern = new RegExp(`${currency}\\s*[\\d,.]+[,.]?[\\d\\s]`, 'g');
  } else {
    pattern = new RegExp(`[\\d,.]+[,.]?[\\d\\s]\\s*${currency}`, 'g');
  }

  return [...string.trim().matchAll(pattern)].map((text) =>
    text[0].trim().replace('[[DOLLAR-SYMBOL]]', '$')
  );
};

function extractPrices(string) {
  const pricesString = [...string.matchAll(PRICE_REGEX)];
  const prices = pricesString.map((priceString) =>
    fromPriceToNumber(priceString[0])
  );

  const currencies = extractCurrencies(string);
  prices.forEach((price, index) => {
    if (currencies[0] === undefined) {
      throw new SyntaxError(
        'Missing currency. Make sure a currency is present inside the string input.'
      );
    }

    if (
      currencies[index] === undefined ||
      currencies[0] === currencies[index]
    ) {
      return;
    }

    throw new SyntaxError(
      `Varying currencies are not allowed. Currency parsed is ${currencies[0]} but found: ${currencies[index]}.`
    );
  });

  const texts = extractTexts(string, currencies[0]);

  return [prices, currencies[0], texts];
}

export default extractPrices;
