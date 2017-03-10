import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import {KropotkinQuote} from '../Kropotkin';

function setupKropotkin({isFetchingKropotkin=false, kropotkinFetchError=false, paragraph='',
      fetchRandomKropotkin=()=>{}}) {
  const props = {fetchRandomKropotkin, kropotkin: {isFetchingKropotkin, kropotkinFetchError, paragraph}};
  return shallow(<KropotkinQuote {...props} />);
}

describe('Kropotkin', () => {
  it('exists', () => {
    const wrapper = setupKropotkin({});
    expect(wrapper).toExist();
  });
  it('displays nothing if isFetchingKropotkin is true', () =>{
    const wrapper = setupKropotkin({isFetchingKropotkin: true,
      kropotkinFetchError: false, paragraph: 'glory'});
    expect(wrapper.find('.kropotkin-quote')).toBeFalse();
  });
  it('displays nothing if kropotkinFetchError is true ', () =>{
    const wrapper = setupKropotkin({isFetchingKropotkin: false,
      kropotkinFetchError: true, paragraph: 'glory'});
      expect(wrapper.find('.kropotkin-quote')).toNotExist();
  });
  it('displays nothing if paragraph is empty ', () =>{
    const wrapper = setupKropotkin({isFetchingKropotkin: false,
      kropotkinFetchError: false, paragraph: ''});
    expect(wrapper.find('.kropotkin-quote')).toNotExist();
  });
  describe(' A Kropotkin with appropriate parmeter values', () => {
    let fullWrapper;
    beforeEach(() => {
      fullWrapper = setupKropotkin({isFetchingKropotkin: false,
        kropotkinFetchError: false, paragraph: 'Hello World'})
      });
    it('has class kropotkin-quote', () => {
      expect(fullWrapper.find('.kropotkin-quote')).toExist();
    });
  });
});
