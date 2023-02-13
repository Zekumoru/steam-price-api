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
    expect(currency).toBe('€');
  });

  it('should return price of -1 for games that are unavailable for purchase', async () => {
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
    const { value, currency } = await getSteamPrice('minecraft');

    expect(value).toBeCloseTo(-1);
    expect(currency).toBe(undefined);
  });

  it('should return price of 0 for games that are free to play', async () => {
    jest
      .spyOn(getSteamSearchResultsModule, 'default')
      .mockImplementation(async (title) => {
        if (title !== 'undertale') {
          throw new SyntaxError(
            "Make sure that the game's prices being retrieved is the same as the one in this test"
          );
        }
        const undertale = (await import('./data/undertale.json')).default;
        undertale[0].price = 'Free to Play';
        return undertale;
      });
    const { value, currency } = await getSteamPrice('undertale');

    expect(value).toBeCloseTo(0);
    expect(currency).toBe(undefined);
  });
});
