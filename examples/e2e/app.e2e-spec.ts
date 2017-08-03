import { AtomicSeed2Page } from './app.po';

describe('atomic-seed2 App', () => {
  let page: AtomicSeed2Page;

  beforeEach(() => {
    page = new AtomicSeed2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
