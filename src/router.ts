import Vue from 'vue';
import Router from 'vue-router';
import List from './views/List.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: List,
    },
    {
      path: '/viz',
      name: 'viz',
      // route level code-splitting
      // this generates a separate chunk (viz.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "viz" */ './views/Viz.vue'),
    },
  ],
});
