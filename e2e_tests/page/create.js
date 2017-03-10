
const instruction_1 = {
    instruction_panel: {
      selector: '#instructions-for-create-panel'
    },
    next_button: {
      selector: '.next'
    }
  },
  consent_2 = {
    consentForCreatePanel: {
      selector: '#consent-for-create-panel'
    },
    negateButton: {
      selector: '#negate-button'
    },
    consentButton: {
      selector: '#consent-button'
    }
  },
  headline_3 = {
    headline_panel: {
      selector: '.shareable-create-start-panel'
    },
    headlineInput: {
      selector: '#headline-input'
    },
    summaryInput: {
      selector: 'summary-input'
    }
  },
  thing_4 = {},
  space_5 = {},
  time_6 = {},
  confirm_7 = {};

module.exports = {
  url: function () {
    return 'http://localhost:3000/shareables/create'
  },
  elements: {
    instruction_panel: instruction_1.instruction_panel,
    instruction_next_button: instruction_1.next_button,
    consent_panel: consent_2.consentForCreatePanel,
    consent_negate: consent_2.negateButton,
    consent_consent: consent_2.consentButton,

  }
};
