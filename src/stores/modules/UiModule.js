export default {
    state: {
        alert: {
            display: false,
            text: '',
            alertClass: '',
            icon: ''
        },
        sideMenu: {
            model: null,
        }
    },
    getters: {
        NOTIFICATION: state =>{
            return state.alert;
        },
        MENUMODEL: state =>{
            return state.sideMenu.model;
        }
    },
    mutations: {
        SET_NOTIFICATION (state, {display, text, alertClass, icon}) {
            state.alert.display = display;
            state.alert.text = text;
            state.alert.alertClass = alertClass;
            state.alert.icon = icon;
        },

        SET_MODEL (state, {model}){
            state.sideMenu.model = model;
        }
    },
    actions: {}
}