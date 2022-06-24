import { createApp, h } from 'vue'
//Bootstrap CSS Framework
import "bootstrap/dist/css/bootstrap.min.css"

import App from './App.vue'
import { createRouter, createWebHashHistory } from "vue-router";
import store from './store';

import ProductList from "./components/Product/List.vue";
import ProductDetail from "./components/Product/Detail.vue";
//Authentication Components
import LoginPage from "./components/Auth/Login.vue";
import RegisterPage from "./components/Auth/Register.vue";

//Mapping Routes to Components
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
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {

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

//Bootstrap JS Helpers
import "bootstrap/dist/js/bootstrap.js"