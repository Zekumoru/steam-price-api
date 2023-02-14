import getSteamTitlesPrices from '../getSteamTitlesPrices';
import * as getSteamSearchResultsModule from '../getSteamSearchResults';

describe("Get Steam game titles' prices", () => {
  it('should return the prices of the retrieved game titles', async () => {
    const spySteamSearchResultsModule = jest.spyOn(
      getSteamSearchResultsModule,
      'default'
    );
    spySteamSearchResultsModule.mockImplementation(async (title) => {
      if (title === 'oneshot') {
        return (await import('./data/oneshot.json')).default;
      }
      if (title === 'undertale') {
        return (await import('./data/undertale.json')).default;
      }
      if (title === 'minecraft') {
        return (await import('./data/minecraft.json')).default;
      }
      if (title === 'timberborn') {
        return (await import('./data/timberborn.json')).default;
      }

      throw new SyntaxError(
        "Make sure that the games' prices being retrieved are the same as the ones in this test"
      );
    });
    const titles = await getSteamTitlesPrices([
      'oneshot',
      'undertale',
      'minecraft',
      'timberborn',
    ]);

    expect(typeof titles[0].price.value).toBe('number');
    expect(typeof titles[1].price.value).toBe('number');
    expect(typeof titles[2].price.value).toBe('number');
    expect(typeof titles[3].price.value).toBe('number');
  });

  it('should return the prices in the same order as the game titles that were passed', async () => {
    const spySteamSearchResultsModule = jest.spyOn(
      getSteamSearchResultsModule,
      'default'
    );
    const waitByRandomMilliseconds = (max) => {
      return new Promise((resolve) =>
        setTimeout(resolve, Math.random(max) * max)
      );
    };
    spySteamSearchResultsModule.mockImplementation(async (title) => {
      if (title === 'oneshot') {
        await waitByRandomMilliseconds(100);
        return (await import('./data/oneshot.json')).default;
      }
      if (title === 'undertale') {
        await waitByRandomMilliseconds(100);
        return (await import('./data/undertale.json')).default;
      }
      if (title === 'minecraft') {
        await waitByRandomMilliseconds(100);
        return (await import('./data/minecraft.json')).default;
      }
      if (title === 'timberborn') {
        await waitByRandomMilliseconds(100);
        return (await import('./data/timberborn.json')).default;
      }

      throw new SyntaxError(
        "Make sure that the games' prices being retrieved are the same as the ones in this test"
      );
    });
    const titles = await getSteamTitlesPrices([
      'oneshot',
      'undertale',
      'minecraft',
      'timberborn',
    ]);

    expect(titles[0].title).toBe('oneshot');
    expect(titles[1].title).toBe('undertale');
    expect(titles[2].title).toBe('minecraft');
    expect(titles[3].title).toBe('timberborn');
  });
});
