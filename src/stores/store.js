import Vue from 'vue';
import Vuex from 'vuex';
import UserModule from './modules/UserModule';
import UiModule from './modules/UiModule';
import TodoModule from './modules/TodoModule';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        jwt: localStorage.getItem('t'),
        saveCreds: localStorage.getItem('creds')
    },
    mutations: {
        SET_TOKEN (state, { token }){
            localStorage.setItem('t', token);
            state.jwt = localStorage.getItem('t');
        },
        SET_CREDS (state, { creds }){
            localStorage.setItem('creds', creds);
            state.saveCreds = localStorage.getItem('creds');
        }
    },
    actions: {
        LOGOUT(){
            this.commit('SET_TOKEN', {token: ""});
            this.commit('SET_CREDS', {creds: false});
            
        }
    },
    modules: {
        user: UserModule,
        ui: UiModule,
        todo: TodoModule
    },
});