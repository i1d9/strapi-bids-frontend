import { createApp, h } from 'vue'

import App from './App.vue'
import { createRouter, createWebHashHistory } from "vue-router";
import store from './store';

import ProductList from "./components/Product/List.vue";
import ProductDetail from "./components/Product/Detail.vue";

import LoginPage from "./components/Auth/Login.vue";
import RegisterPage from "./components/Auth/Register.vue";


//Route Section
const routes = [{ path: "/", component: ProductList }, { path: "/:id", component: ProductDetail }, { path: "/login", component: LoginPage }, { path: "/register", component: RegisterPage }];
const router = createRouter({


    history: createWebHashHistory(),
    routes,
});

const app = createApp({
    render: () => h(App),
});




app.use(router);
app.use(store);
app.mount('#app');

