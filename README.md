# Vue Timing Events [![Build Status](https://travis-ci.org/dannynpham/vue-timing-events.svg?branch=master)](https://travis-ci.org/dannynpham/vue-timing-events)

> It automatically cleans up timers and event listeners on component beforeDestroy

## Install

```
$ npm install vue-timing-events
```

# Usage

```js
import Vue from "vue";
import VueTimingEvents from 'vue-timing-events';

Vue.use(VueTimingEvents);
```

```js
// Somecomponent.vue
export default {
  created() {
    this.$setInterval(this.doInterval, 2000);
    this.$addEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    doInterval() {
      console.log("Are we there yet?");
    },
    onResize() {
      console.log("Hey stop triggering so much layout/reflow. :(");
    }
  }
}
```

## License

MIT © [Danny Pham](https://dannynpham.tech)
