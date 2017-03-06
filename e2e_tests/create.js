/**
 * Created by mitchell on 3/3/17.
 */

class PageElements {
  constructor({}) {
  }
}
const consent_1 = {
  elements: {}
};


const instructions_2 = {
  elements: {}
};


const headline_3 = {
  elements: {}
};


const thing_4 = {
  elements: {}
};


const space_5 = {
  elements: {}
};

const time_6 = {
  elements: {}
};

const confirm_7 = {
  elements: {}
};

module.exports = {
  'Create Page is navigable': (client) => {
    client
      .url('http://localhost:3000/shareables/create')
      .find('.')
  }
}
/*
module.exports = {
    url: () => {return this.api.launch_url + '/shareables/create';},
    steps: {
      consent_1 : consent_1,
      instructions_2 : instructions_2,
      headline_3 : headline_3,
      thing_4 : thing_4,
      space_5 : space_5,
      time_6 : time_6,
      confirm_7: confirm_7
    }
  };

*/
