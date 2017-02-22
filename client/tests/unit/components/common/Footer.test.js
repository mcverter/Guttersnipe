import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import Footer from '../../../../components/common/Footer';

let footer;

beforeEach(() => {
  footer = shallow(<Footer />);
});
describe('Footer', () => {
  it('renders', () => {
    const wrapper = footer;
    expect(true).toBe(true);
  });

});
