import extractPrices from '../extractPrices';

describe('Extract prices', () => {
  it('should extract the price and currency', () => {
    const priceString = '2,99€';

    expect(extractPrices(priceString)[0][0]).toBeCloseTo(2.99);
    expect(extractPrices(priceString)[1].symbol).toBe('€');
  });

  it("should extract currency's placement, meaning whether it is on the left or right of the price value", () => {
    const euroPriceString = '2,99€';
    const dollarPriceString = '$2,99';

    expect(extractPrices(euroPriceString)[1].placement).toBe('right');
    expect(extractPrices(dollarPriceString)[1].placement).toBe('left');
  });

  it('should deal with string inputs with spaces', () => {
    const priceString = '2,99 €';

    expect(extractPrices(priceString)[1].symbol).toBe('€');
  });

  it('should extract multiple prices', () => {
    const priceString = '4,99€ 2,99€';

    const [prices, currency] = extractPrices(priceString);

    expect(prices[0]).toBeCloseTo(4.99);
    expect(prices[1]).toBeCloseTo(2.99);
    expect(currency.symbol).toBe('€');
  });

  it('must throw an error if a currency is not present in the input string', () => {
    const priceString = '4,99 2,99';

    expect(() => {
      extractPrices(priceString);
    }).toThrowError(/missing currency/i);
  });

  it('must throw an error if multiple currencies are found in the input string', () => {
    const priceString = '$4,99 2,99€';

    expect(() => {
      extractPrices(priceString);
    }).toThrowError(/varying currencies are not allowed/i);
  });

  it('should extract the prices (EUR) in the same format as the input, basically extracting each price string in the input string', () => {
    const priceString = '4,99€ 2,99€';

    const texts = extractPrices(priceString)[2];

    expect(texts[0]).toBe('4,99€');
    expect(texts[1]).toBe('2,99€');
  });

  it('should extract the prices (USD) in the same format as the input, basically extracting each price string in the input string', () => {
    const priceString = '$4.99 $2.99';

    const texts = extractPrices(priceString)[2];

    expect(texts[0]).toBe('$4.99');
    expect(texts[1]).toBe('$2.99');
  });
});
