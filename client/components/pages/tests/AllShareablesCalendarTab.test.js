import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import {AllShareablesCalendarTabComponent} from '../AllShareablesCalendarTab';

function setup({isFetchingShareables=false, items=[]}) {
  const props = {shareables: {isFetchingShareables, items}};
  return shallow(<AllShareablesCalendarPage {...props} />);
}

describe('AllShareablesCalendarTabComponent', () => {
  it('displays loading if isFetchingShareables is true', () =>{
    const wrapper = setup({isFetchingShareables: true, items: ['foo']});
    expect(wrapper.find('div').text()).toEqual('Loading...');
  });
  it('displays loading if items array is null or has no items', () =>{
    let wrapper = setup({isFetchingShareables: false, items: undefined});
    expect(wrapper.find('div').text()).toEqual('Loading...');
    wrapper = setup({isFetchingShareables: false, items: []});
    expect(wrapper.find('div').text()).toEqual('Loading...');
  });
  describe (' with items and not fetching shareables', () => {
    let wrapper;
    beforeEach(()=>{
      wrapper = setup({isFetchingShareables: false, items: ['foo']});
    });
    it ('has correct css class', () => {
      expect(wrapper.find('.all-shareables-calendar-tab')).toExist();
    });
  });
});
