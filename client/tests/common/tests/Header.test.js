import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import Header from '../Header';

function makeFooter(authenticated) {
  const props = {
  };

  return shallow(<Header {...props} />);
}

describe('Header', () => {
  it('shows link to home page', () => {
  });

  it('shows Sign In Link when not authenticated', () => {
  });

  it('shows Sign Up Link when not authenticated', () => {
  });

  it('shows Sign Out Link when authenticated', () => {
  });
});
