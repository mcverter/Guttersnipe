import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import Footer from '../Footer';


  beforeEach(() => {
    footer = shallow(<Footer />);
  });
describe('Footer', () => {
  it('renders', () => {
    const wrapper = footer;
    expect(wrapper.find('a').length).toBe(1);
  });

});
