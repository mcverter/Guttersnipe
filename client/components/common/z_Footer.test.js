import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import Footer from './Footer';

describe('Footer', () => {
  it('exists', () => {
    const wrapper = mount(<Footer />);
    expect(wrapper).toExist();
  });

  it('has class gs-navbar', () => {
    const wrapper = mount(<Footer />);
    expect(wrapper.find('.gs-navbar')).toExist()
  })
});
