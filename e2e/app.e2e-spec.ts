import { HealthchroniclePage } from './app.po';

describe('healthchronicle App', function() {
  let page: HealthchroniclePage;

  beforeEach(() => {
    page = new HealthchroniclePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
