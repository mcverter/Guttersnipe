import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import {Header} from '../Header';

describe('Header', () => {
  it('exists', () => {
    const wrapper = mount(<Header />);
    expect(wrapper).toExist();
  });

  it('has class gs-navbar', () => {
    const wrapper = mount(<Header />);
    expect(wrapper.find('.gs-navbar')).toExist();
  });
  describe('without authentication', () => {
    let unauthHeader;
    beforeEach(() => {
      let props = {authenticated: false};
      unauthHeader = mount(<Header {...props} />);
    });
    it ('has only four links', () => {
      expect(unauthHeader.find('a').length).toEqual(4);
    });
  });
  describe('with authentication', () => {
    let unauthHeader;
    beforeEach(() => {
      let props = {authenticated: true};
      unauthHeader = mount(<Header {...props}/>);
    });
    it ('has only two links', () => {
      expect(unauthHeader.find('a').length).toEqual(2);
    });
  });
});
