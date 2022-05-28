import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// import { mapGetters } from 'vuex';

// const theState = {
//     ...mapGetters('user', {
//         isLoggedIn: 'getLoggedInStatus'
//     })
// }


const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'IndexPage',
            component: () => import('pages/index.vue')
        },
        {
            path: '/step-one',
            name: 'step-one',
            component: () => import('pages/step-one.vue'),
            meta: { requiresAuth: true }
        }
    ]
});



export default router;