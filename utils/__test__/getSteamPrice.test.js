import getSteamPrice from '../getSteamPrice';
import * as getSteamSearchResultsModule from '../getSteamSearchResults';

describe('Get steam price', () => {
  it('should return the price of the game', async () => {
    jest
      .spyOn(getSteamSearchResultsModule, 'default')
      .mockImplementation(async (title) => {
        if (title !== 'oneshot') {
          throw new SyntaxError(
            "Make sure that the game's prices being retrieved is the same as the one in this test"
          );
        }
        return (await import('./data/oneshot.json')).default;
      });
    const { value, currency } = await getSteamPrice('oneshot');

    expect(value).toBeCloseTo(9.99);
    expect(currency.symbol).toBe('€');
  });

  it('should return the text price of the game', async () => {
    jest
      .spyOn(getSteamSearchResultsModule, 'default')
      .mockImplementation(async (title) => {
        if (title !== 'oneshot') {
          throw new SyntaxError(
            "Make sure that the game's prices being retrieved is the same as the one in this test"
          );
        }
        return (await import('./data/oneshot.json')).default;
      });
    const { text } = await getSteamPrice('oneshot');

    expect(text).toBe(`9,99€`);
  });

  it('should return the original string input', async () => {
    jest
      .spyOn(getSteamSearchResultsModule, 'default')
      .mockImplementation(async (title) => {
        if (title !== 'oneshot') {
          throw new SyntaxError(
            "Make sure that the game's prices being retrieved is the same as the one in this test"
          );
        }
        const oneshotResults = (await import('./data/oneshot.json')).default;
        oneshotResults[0].price = 'original string';
        return oneshotResults;
      });
    const { original_string } = await getSteamPrice('oneshot');

    expect(original_string).toBe('original string');
  });

  it('should return unavailable for games that have no prices', async () => {
    jest
      .spyOn(getSteamSearchResultsModule, 'default')
      .mockImplementation(async (title) => {
        if (title !== 'oneshot') {
          throw new SyntaxError(
            "Make sure that the game's prices being retrieved is the same as the one in this test"
          );
        }
        const oneshotResults = (await import('./data/oneshot.json')).default;
        oneshotResults[0].price = '';
        return oneshotResults;
      });
    const { text } = await getSteamPrice('oneshot');

    expect(text).toBe('Unavailable');
  });

  test('that original string is present in the result', async () => {
    jest
      .spyOn(getSteamSearchResultsModule, 'default')
      .mockImplementation(async (title) => {
        if (title !== 'minecraft') {
          throw new SyntaxError(
            "Make sure that the game's prices being retrieved is the same as the one in this test"
          );
        }
        return (await import('./data/minecraft.json')).default;
      });
    const { original_string } = await getSteamPrice('minecraft');

    expect(original_string).toBe('Unavailable');
  });

  it("should return price of -1 and text of 'Unavailable' for games that are unavailable for purchase", async () => {
    jest
      .spyOn(getSteamSearchResultsModule, 'default')
      .mockImplementation(async (title) => {
        if (title !== 'minecraft') {
          throw new SyntaxError(
            "Make sure that the game's prices being retrieved is the same as the one in this test"
          );
        }
        return (await import('./data/minecraft.json')).default;
      });
    const { value, currency, text } = await getSteamPrice('minecraft');

    expect(value).toBeCloseTo(-1);
    expect(currency.symbol).toBe(undefined);
    expect(text).toBe('Unavailable');
  });

  it("should return price of 0 and text of 'Free to Play' for games that are free to play", async () => {
    jest
      .spyOn(getSteamSearchResultsModule, 'default')
      .mockImplementation(async (title) => {
        if (title !== 'undertale') {
          throw new SyntaxError(
            "Make sure that the game's prices being retrieved is the same as the one in this test"
          );
        }
        const undertaleResults = (await import('./data/undertale.json'))
          .default;
        undertaleResults[0].price = 'Free to Play';
        return undertaleResults;
      });
    const { value, currency, text } = await getSteamPrice('undertale');

    expect(value).toBeCloseTo(0);
    expect(currency.symbol).toBe(undefined);
    expect(text).toBe('Free to Play');
  });
});
