/* VUE */
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './assets/scss/styles.scss';

/* ROUTES */
import { Routes } from '@/router/Routes';

/* REQUIRED */
import authStore from './store/auth';
import { enviroment } from './core/env/enviroment';
import copyText from '@meforma/vue-copy-to-clipboard';
import { utilitiesStore } from './store/utilities';

/* LARAVEL ECHO */

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Pusher: any;
    Echo: any;
  }
}

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: enviroment.KEY_PUSHER,
  cluster: enviroment.APP_CLUSTER,
  enabledTransports: ['ws'],
  wsHost: enviroment.HOST_SOCKET,
  wsPort: 6001,
  authEndpoint: `${enviroment.URL_API}broadcasting/auth`,
  auth: {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('_vsr')}`,
    },
  },
  forceTLS: false,
  disableStats: true,
});

const router = createRouter({
  history: createWebHistory(),
  routes: new Routes().getRoutes(),
});

if (!authStore.getters.isAuth) {
  utilitiesStore.commit('setToggled', false);
} else {
  utilitiesStore.commit('setToggled', true);
}

const app = createApp(App);
app.config.globalProperties.$round = (num: number, maxDecimal = 1) => {
  const factor = Math.pow(20, maxDecimal);
  return Math.round(num * factor) / factor;
};

app.config.globalProperties.$env = { url: enviroment.URL };

app.config.globalProperties.$lowerCase = (value: string) => {
  return value.toLowerCase();
};

app.config.globalProperties.$rounding = (value: number) => {
  if (value % 2 !== 0) {
    return Math.trunc(value) + 1;
  } else {
    return value;
  }
};


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!authStore.state.auth.id) {
      next({
        name: 'signIn',
        query: { redirect: to.path },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresAuth === false)) {
    if (authStore.state.auth.id) {
      next({
        name: 'home',
        query: { redirect: to.path },
      });
    }
    next();
  } else if (to.name === 'home') {
    if (authStore.state.auth.id) {
      if (authStore.state.auth.role === 'customer') {
        next();
        return;
      } else if (authStore.state.auth.role === 'admin') {
        next({
          name: 'mySales',
        });
        return;
      }
    }
    next();
  } else {
    next(); // make sure to always call next()!
  }
});

app.use(authStore);
app.use(router);
app.use(copyText);
app.mount('#app');
