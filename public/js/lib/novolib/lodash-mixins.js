(function (_) {
  'use strict';

  var handlers = {};

  _.mixin({
    toBoolean: function toBoolean(value) {
      /* jshint eqeqeq:false */
      return value == 'false' ? !value : !!value;
    },

    maybe: function maybe(val, path) {
      var next = function (val, path) {
        var f = _.first(path),
            r = _.rest(path);

        if (!_.isNull(val) && !_.isUndefined(val[f])) {
          if (_.isEmpty(r)) {
            return val[f];
          }
          return next(val[f], r);
        }

        return undefined;
      };

      if (_.isString(path)) {
        path = path.split('.');
      }

      return next(val, path);
    },

    on: function on(eventKey, handler) {
//    console.debug(eventKey, 'Handlers Before', _.size(handlers[eventKey]));

      try {
        if (!_.isFunction(handler)) {
          console.error(eventKey, 'Handler must be a function', handler);
          return;
        }

        if (!_.isArray(handlers[eventKey])) {
          handlers[eventKey] = [];
        }

        if (_.contains(handlers[eventKey], handler)) {
          console.warn(eventKey, 'Handler already registered for event');
          return;
        }

//      console.debug(eventKey, 'Added handler', handler);
        handlers[eventKey].push(handler);
      } finally {
//      console.debug(eventKey, 'Handlers After', _.size(handlers[eventKey]));
      }
    },

    off: function off(eventKey, handler) {
//    console.debug(eventKey, 'Handlers Before', _.size(handlers[eventKey]));

      try {
        if (!handler) {
          console.warn(eventKey, 'Removing all event handlers for');
          handlers[eventKey] = [];
          return;
        }

        if (!_.contains(handlers[eventKey], handler)) {
          console.warn(eventKey, 'Handler not found in registered for event');
          return;
        }

        console.debug(eventKey, 'Removing handler');
        handlers[eventKey] = _.without(handlers[eventKey], handler);
      } finally {
//      console.debug(eventKey, 'Handlers After', _.size(handlers[eventKey]));
      }
    },

    trigger: function trigger(eventKey) {
      var args = Array.prototype.slice.call(arguments, 1);
//    console.debug(eventKey, 'Trigger handlers with arguments', args);
      _.each(handlers[eventKey], function (handler) {
        handler.apply(null, args);
      });
    }
  });

}) (window._);
