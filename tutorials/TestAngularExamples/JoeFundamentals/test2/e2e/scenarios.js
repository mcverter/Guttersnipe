'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('event registration app', function() {

  it('should automatically redirect to /events as the default route', function() {
    browser().navigateTo('/');
    expect(browser().location().path()).toBe('/events');
  });

  describe('events', function() {

    beforeEach(function() {
      browser().navigateTo('/events');
    });

    it('should render the events page', function() {
      expect(element('h1:first').text()).toMatch(/Events/);
      expect(element('h2:first').text()).toMatch(/Angular Code Camp/);
    });
  });

  describe('event details', function() {

    beforeEach(function() {
      browser().navigateTo('/event/1');
    });

    it('should sort sessions by name', function() {
      expect(element('h4.well-title:first').text()).toMatch(/How To Be Awesome/);
    });

    it('should have 5 sessions', function() {
      expect(repeater('.thumbnails li').count()).toBe(5);
    });

    it('should have 2 sessions when introductory filter is chosen', function() {
      select('query').option('introductory');
      expect(repeater('.thumbnails li').count()).toBe(2);
    });

    it('should be sorted by vote after sort order is changed to sort by vote', function() {
      select('sortorder').option('-upVoteCount');
      expect(element('h4.well-title:first').text()).toMatch(/How To Program/);
    });

    it('should increment the vote count when a session is up voted', function() {
      browser().navigateTo('/login');
      pause();
      input('user.userName').enter('bob');
      input('user.password').enter('bob');
      element(':button.btn').click();
      element('div.well:first').click();
      element('.votingButton:first').click();
      expect(element('.voteCount:first').text()).toBe('1');
    })

  })

});
