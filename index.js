// Install the components
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
export default {
  install: (Vue) => {
    const INTERVALS = 'intervals';
    const TIMEOUTS = 'timeouts';
    const LISTENERS = 'listeners';
    Vue.prototype.$componentListeners = new Map();

    Vue.mixin({
      created() {
        const listeners = new Map([
          [INTERVALS, []],
          [TIMEOUTS, []],
          [LISTENERS, []],
        ]);
        this.$componentListeners.set(this._uid, listeners);
      },
      beforeDestroy() {
        this._cleanup(INTERVALS, window.clearInterval);
        this._cleanup(TIMEOUTS, window.clearTimeout);
        this._cleanupListener();

        this.$componentListeners.delete(this._uid);
      },
      methods: {
        _cleanup(type, func) {
          const compListener = this.$componentListeners.get(this._uid);
          const events = compListener.get(type);
          events.forEach((event) => func(event));
        },
        _cleanupListener() {
          const compListener = this.$componentListeners.get(this._uid);
          const listeners = compListener.get(LISTENERS);
          listeners.forEach(([event, callback]) => window.removeEventListener(event, callback));
        },
      },
    });

    Vue.prototype.$setInterval = function $setInterval(callback, interval) {
      const compListener = this.$componentListeners.get(this._uid);
      const intervals = compListener.get(INTERVALS);

      intervals.push(window.setInterval(callback, interval));
    };

    Vue.prototype.$setTimeout = function $setTimeout(callback, timeout) {
      const compListener = this.$componentListeners.get(this._uid);
      const timeouts = compListener.get(TIMEOUTS);

      timeouts.push(window.setTimeout(callback, timeout));
    };

    Vue.prototype.$addEventListener = function $addEventListener(event, callback, opts) {
      const compListener = this.$componentListeners.get(this._uid);
      const listeners = compListener.get(LISTENERS);

      listeners.push([event, callback]);
      window.addEventListener(event, callback, opts);
    };
  },
};
