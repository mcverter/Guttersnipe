if ("undefined" === typeof(_etmc)) {
  var _etmc = [];
}

var _etmc_temp = _etmc;
var _etmc = {

  debug: false,

  setup: function(array) {
    var l = array.length;
    for (var i = 0; i < l; i++) {
      this.callFunc(array[i]);
    }
  },

  push: function(item) {
    this.callFunc(item);
  },

  callFunc: function(array) {
    func_name = array[0];
    args = array.slice(1,3);
    this[func_name](args);
  },

  setOrgId: function(args) {
    this.org_id = args[0];
  },

  setUserInfo: function(args) {
    var user_info = args[0];
    if(this.user_info && this.user_info.email) {
      user_info.email = this.user_info.email;
    }
    this.user_info = user_info;
  },

  setConversionTrackingInfoFromUrl: function() {
    this.email_job_id = this.getURLParameter("j");
    this.email = this.getURLParameter("e");
    if (this.email != null) {
      if (this.user_info) {
        this.user_info.email = this.email;
      } else {
        this.user_info = { "email" : this.email };
      }
    }
    this.email_list_id = this.getURLParameter("l");
    this.email_landing_url_id = this.getURLParameter("u");
    this.email_job_batch_id = this.getURLParameter("jb");
    this.mid = this.getURLParameter("mid");
  },

  isEtConversionTracking: function() {
    return (
      this.email_job_id != null &&
      this.email != null &&
      this.email_list_id != null &&
      this.email_landing_url_id != null &&
      this.email_job_batch_id != null &&
      this.mid != null
    );
  },

  trackPageView: function(args) {
    this.setConversionTrackingInfoFromUrl();
    var pageView = args[0] || {};
    if (this.org_id) {
      pageView.title = document.title;
      pageView.url = decodeURI(window.location.href);
      pageView.referrer = document.referrer;
      if (this.isEtConversionTracking()) {
        pageView.et_email = {};
        pageView.et_email.job_id = this.email_job_id;
        pageView.et_email.list_id = this.email_list_id;
        pageView.et_email.landing_url = this.email_landing_url_id;
        pageView.et_email.job_batch_id = this.email_job_batch_id;
        pageView.et_email.mid = this.mid;
      }
      this.sendDataWithImage("track_page_view", pageView);
    }
  },

  trackCart: function(args) {
    var cart = args[0] || {};
    if (this.org_id) {
      var cartInfo = this.standardizeCart(cart);
      if ("clear_cart" in cart) {
        cartInfo.clear_cart = cart.clear_cart;
      }
      this.sendDataWithImage("track_cart", cartInfo);
    }
  },

  trackConversion: function(args) {
    var cart = args[0] || [];
    var details = args[1];
    if (this.org_id) {
      var cartInfo = this.standardizeCart(cart);
      if (cart["details"]) {
        cartInfo.details = cart["details"];
      }else if (details) {
        if ("details" in details) {
          cartInfo.details = details.details;
        }
      }
      this.sendDataWithImage("track_conversion", cartInfo);
    }
  },

  trackEvent: function(args) {
    var customEvent = args[0] || {};
    var customName = customEvent.name;
    var newEvent = {};
    if (this.org_id) {
      if (customName != null) {
        newEvent.event_name = customName;
        if (customEvent.details) {
          newEvent.details = customEvent.details;
        }
        this.sendDataWithImage("track_event", newEvent);
      }
    }
  },

  trackWishlist: function(args) {
    var wishlist = args[0] || [];
    if (this.org_id) {
      if (wishlist != []) {
        this.sendDataWithImage("track_wishlist", wishlist);
      }
    }
  },

  trackRating: function(args){
    var rating = args[0] || {};
    if (this.org_id){
      if (rating.rating != null) {
        this.sendDataWithImage("track_rating", rating);
      }
    }
  },

  sendDataWithImage: function(endpoint, args) {
    if (this.user_info) {
      args.user_info = this.user_info;
    }
    var collectData = encodeURIComponent(JSON.stringify(args));
    var protocolPrepend = 'http';
    if (document.location.protocol=='https:') protocolPrepend = 'https';
    var image_tag = '<img src="' + protocolPrepend + '://nova.collect.igodigital.com/c2/';
    image_tag +=  this.org_id + '/' + endpoint +'?payload=' + collectData + '" style="display:none" width="0" height="0"/>';

    if (this.debug) {
      console.log(args);
      console.log(image_tag);
    } else {
      etmc_element = document.createElement('div');
      etmc_element.style.display = "none";
      etmc_element.innerHTML = image_tag;
      document.body.appendChild(etmc_element);
    }
  },

  standardizeCart: function(cart){
    var cartInfo = {};
    if (Array.isArray(cart) == true) {
      cartInfo = { "cart": cart };
    } else if ("cart" in cart) {
      cartInfo = cart;
    } else if ("item" in cart) {
      cartInfo = { "cart": [cart] };
    }
    return cartInfo;
  },

  updateItem: function(args) {
    var rec_items = args[0];
    if (rec_items !== null && rec_items["item_attributes"] !== undefined) {
      var items_to_update = { "item_attributes": null };

      var item_attrs = rec_items["item_attributes"];

      if (!Array.isArray(item_attrs)) {
        item_attrs = [item_attrs];
      }

      var valid_items = [];

      for (var i in item_attrs) {
        if (item_attrs.hasOwnProperty(i)) {
          this.setDefaultItemValues(item_attrs[i]);
          if (this.hasRequiredFields(item_attrs[i])) {
            valid_items.push(item_attrs[i]);
          } else {
            console.log("ETMC update_rec_item error: required fields were missing from " + JSON.stringify(item_attrs[i]));
          }
        }
      }

      if (valid_items.length > 0) {
        items_to_update["item_attributes"] = valid_items;
      }

      if (items_to_update["item_attributes"] !== null) {
        this.sendDataWithImage("update_item", items_to_update);
      }
    }
  },

  getURLParameter: function(paramName) {
    var regex = new RegExp('[?|&]' + paramName + '=' + '([^&;]+?)(&|#|;|$)');
    var matches = regex.exec(window.location.search) || [,""];
    var parameterValue = matches[1].replace(/\+/g, '%20');
    return decodeURIComponent(parameterValue) || null;
  },

  hasRequiredFields: function(item) {
    var isValid = item["id"] !== undefined && item["url"] !== undefined;

    if (isValid) {
      var item_type = item["item_type"];
      if (item_type == undefined || item_type === "product" || item_type === "content") {
        isValid = item["name"] != undefined;
      } else if (item_type === "banner") {
        isValid = item["image_url"] !== undefined &&
          (item["banner_size"] !== undefined || item["location_size"] !== undefined);
      }
    }
    return isValid;
  },

  setDefaultItemValues: function(item) {
    if (item["item_type"] == undefined){
      item["item_type"] = "content";
    }
    if (item["url"] == undefined) {
      item["url"] = window.location.href;
    }
    if (item["type"] !== "banner" && item["name"] == undefined) {
      item["name"] = document.title;
    }
  }
};

_etmc.setup(_etmc_temp);
