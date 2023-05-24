import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEuroSign, faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'firebase/firestore';
import firebase from 'firebase/app';
import { firestorePlugin } from 'vuefire';
import Toasted from 'vue-toasted';
import { BootstrapVue } from '../node_modules/bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './reset.scss';
import './scss/index.scss';
import App from './App.vue';
import router from './router';

const db = firebase.initializeApp({ projectId: 'currency-proj' }).firestore();

library.add(faSearch);
library.add(faEuroSign);
library.add(faPlusCircle);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(firestorePlugin);
Vue.use(Toasted);
Vue.use(BootstrapVue);

new Vue({
  router,
  data: () => ({}),
  render: (h) => h(App),
}).$mount('#app');
