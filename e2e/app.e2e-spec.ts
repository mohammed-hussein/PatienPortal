import { PatientPortalPage } from './app.po';

describe('patient-portal App', () => {
  let page: PatientPortalPage;

  beforeEach(() => {
    page = new PatientPortalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
