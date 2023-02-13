import extractPrices from '../extractPrices';

describe('Extract prices', () => {
  it('should extract the price and currency', () => {
    const priceString = '2,99€';

    expect(extractPrices(priceString)[0][0]).toBeCloseTo(2.99);
    expect(extractPrices(priceString)[1]).toBe('€');
  });

  it('should deal with string inputs with spaces', () => {
    const priceString = '2,99 €';

    expect(extractPrices(priceString)[1]).toBe('€');
  });

  it('should extract multiple prices', () => {
    const priceString = '4,99€ 2,99€';

    const [prices, currency] = extractPrices(priceString);

    expect(prices[0]).toBeCloseTo(4.99);
    expect(prices[1]).toBeCloseTo(2.99);
    expect(currency).toBe('€');
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
});
