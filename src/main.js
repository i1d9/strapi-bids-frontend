import { createApp, h } from 'vue'

import App from './App.vue'
import { createRouter, createWebHashHistory } from "vue-router";
import store from './store';

import ProductList from "./components/Product/List.vue";
import ProductDetail from "./components/Product/Detail.vue";

import LoginPage from "./components/Auth/Login.vue";
import RegisterPage from "./components/Auth/Register.vue";


import AuctionList from "./components/Auction/List.vue";
import AuctionDetail from "./components/Auction/Detail.vue";
//Route Section
const routes = [
    { path: "/", component: ProductList, meta: { requiresAuth: false }, },
    { path: "/:id", component: ProductDetail, meta: { requiresAuth: false }, },
    { path: "/login", component: LoginPage, meta: { requiresAuth: false }, },
    { path: "/register", component: RegisterPage, meta: { requiresAuth: false } },
    { path: "/auction", component: AuctionList, meta: { requiresAuth: true }, },
    { path: "/auction/:id", component: AuctionDetail, meta: { requiresAuth: true }, }
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
        
        console.log(from);
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

