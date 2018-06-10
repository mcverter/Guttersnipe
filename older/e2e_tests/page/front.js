/**
 * Created by mitchell on 3/7/17.
 */

module.exports = {
  url: function() {
    return 'http://localhost:3000'
  },
  elements : {
    body: {
      selector: 'body'
    },
    header: {
      selector: '.header'
    },
    front_page_container: {
      selector: '#front-pg'
    },
    navigation_buttons: {
      selector: '.btn.btn-lg'
    },
    strummer_quote: {
      selector: '.strummer-quote'
    },
    piaf_image: {
      selector: '#piaf-img'
    },
    footer: {
      selector: '#footer'
    },
    kropotkin_quote_outer: {
      selector: '#kropotkin-quote-outer'
    }
  }
}
