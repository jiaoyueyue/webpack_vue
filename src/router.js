import { createRouter, createWebHistory } from "vue-router";
import Home from './views/Home';
import Me from './views/Me';

const routerHistory = createWebHistory();

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/me',
            name: 'Me',
            component: Me
        }
    ]
})

export default router;