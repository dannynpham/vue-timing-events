# Vue Timing Events ![License](https://badgen.net/github/license/dannynpham/vue-timing-events) ![Library size](https://badgen.net/bundlephobia/minzip/vue-timing-events) ![Dependencies](https://badgen.net/david/dep/dannynpham/vue-timing-events)

Automatically cleans up timers and event listeners on component beforeDestroy

## Install

```
$ npm install -D vue-timing-events

# For Yarn, use the command below.
$ yarn add -D vue-timing-events
```

# Usage

```js
import Vue from 'vue';
import VueTimingEvents from 'vue-timing-events';

Vue.use(VueTimingEvents);
```

```js
// Somecomponent.vue
export default {
  created() {
    this.$setInterval(this.intervaling, 2000);
    this.$setTimeout(this.timingOut, 2000);
    this.$addEventListener('resize', this.onResize, { passive: true });
  },
  methods: {
    intervaling() {
      console.log('Intervaled');
    },
    timingOut() {
      console.log('Timed out');
    },
    onResize() {
      console.log('Resized');
    }
  }
}
```

## License

MIT © [Danny Pham](https://dannynpham.tech)
