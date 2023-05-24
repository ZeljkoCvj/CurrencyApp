import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '../App.vue';
import AddEditCurrency from '../components/Currency/AddEditCurrency.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/currencies',
    name: 'App',
    component: App,
  },
  {
    path: '/currencies/add',
    component: AddEditCurrency,
  },
  {
    path: '/currencies/edit/:id',
    component: AddEditCurrency,
  },
  {
    path: '*',
    redirect: '/currencies',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
