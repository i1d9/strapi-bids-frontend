import Vuex from 'vuex';


import axios from 'axios';
import createPersistedState from "vuex-persistedstate";

const dataStore = {
    state() {
        return {
            auth: null
        }
    },
    mutations: {
        setUser(state, user) {
            state.auth = user
        },
        logOut(state) {
            state.auth = null
        }
    },
    getters: {
        getUser(state) {
            return state.auth;
        }, isAuthenticated: state => !!state.auth,
    },
    actions: {
        async Register({ commit }, form) {
            const json = JSON.stringify(form);

            const { data } = await axios
                .post('http://localhost:1337/api/auth/local/register', json, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            await commit('setUser', { ...data.user, token: data.jwt });

        }, async LogIn({ commit }, form) {
            const json = JSON.stringify(form);


            const { data } = await axios
                .post('http://localhost:1337/api/auth/local/', json, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });



            await commit('setUser', { ...data.user, token: data.jwt });


        }, async LogOut({ commit }) {
            let user = null
            commit('logout', user);
        }
    }
}




export default new Vuex.Store({
    modules: {
        dataStore
    },
    plugins: [createPersistedState()]
})