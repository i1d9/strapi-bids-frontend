import { createApp, h } from 'vue'

import "bootstrap/dist/css/bootstrap.min.css"

import App from './App.vue'
import { createRouter, createWebHashHistory } from "vue-router";
import store from './store';

import ProductList from "./components/Product/List.vue";
import ProductDetail from "./components/Product/Detail.vue";

import LoginPage from "./components/Auth/Login.vue";
import RegisterPage from "./components/Auth/Register.vue";



//Route Section
const routes = [
    { path: "/", component: ProductList, meta: { requiresAuth: true }, },
    { path: "/:id", component: ProductDetail, meta: { requiresAuth: true }, },
    { path: "/login", component: LoginPage, meta: { requiresAuth: false }, },
    { path: "/register", component: RegisterPage, meta: { requiresAuth: false } },
];
const router = createRouter({


    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from) => {

    // instead of having to check every route record with
    // to.matched.some(record => record.meta.requiresAuth)
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.

        from
        return {
            path: '/login',
            // save the location we were at to come back later
            query: { redirect: to.fullPath },
        }
    }
})


const app = createApp({
    render: () => h(App),
});




app.use(router);
app.use(store);
app.mount('#app');


import "bootstrap/dist/js/bootstrap.js"