// This file is auto gererated by build/bin/build-entry.js
import AppVue from './App.vue';
import Assets from './assets';
import Components from './components';
import Directive from './directive';
import Icons from './icons';
import MainJs from './main.js';
import NpmDebugLog from './npm-debug.log';
import Pages from './pages';
import Router from './router';
import Store from './store';
import Styles from './styles';

const version = '1.0.0';
const components = [
  AppVue,
  Assets,
  Components,
  Directive,
  Icons,
  MainJs,
  NpmDebugLog,
  Pages,
  Router,
  Store,
  Styles
];

const install = Vue => {
  components.forEach(Component => {
    Vue.use(Component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  install,
  version,
  AppVue,
  Assets,
  Components,
  Directive,
  Icons,
  MainJs,
  NpmDebugLog,
  Pages,
  Router,
  Store,
  Styles
};

export default {
  install,
  version
};
