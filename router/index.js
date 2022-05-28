import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/pages/index';
import StepOne from '@/page/step-one'

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
            component: Home
        },
        {
            path: '/step-one',
            name: 'step-one',
            component: StepOne
        },
        {
            path: '*',
            component: () => import('@/components/NotFound.vue')
        }
    ]
});



export default router;