<template>
  <v-app id="myTodo">
    <side-menu></side-menu>
    <tool-bar
    toolbarType="user_info"
    :btn_title="user.name"
    >
    </tool-bar>
    
    <v-content>
        <transition-page>
            <router-view></router-view>
        </transition-page>
    </v-content>
  </v-app>
</template>

<script>
import ToolBar from '../Shared/ToolBar';
import { mapGetters } from 'vuex';
import SideMenu from '../SideMenu/SideMenu';
import TransitionPage from '../Shared/TransitionPage';

export default {
    components: {
        ToolBar,
        SideMenu,
        TransitionPage
    },
    data(){
        return{
        }
    },
    created(){
        this.checkUser();        
    },
    computed: {
        ...mapGetters(["USER"]),
        user: {
            get (){
                return this.$store.getters.USER;
            },
            set (user){
                return this.$store.commit('SET_USER', {user: user});
            }
        }
    },
    methods: {
        checkUser(){
            
            if(!this.user.id){
                this.$store.dispatch('RENEW_USER', {
                    token: this.$store.state.jwt,
                    resource: this.$resource,
                    path: 'user{/id}'
                }).then((data) => {
                    this.user.email  = data.email;
                    this.user.id     = data.id;
                    this.user.name   = data.name;
                    this.user.status = data.status;
                    this.checkStatus();
                }, err => {
                    this.$store.commit('SET_NOTIFICATION', {
                        display: true,
                        text: err.body,
                        alertClass: "error",
                        icon: "error"
                    });
                    this.$store.dispatch('LOGOUT');
                    this.$router.push({name: "login"});
                });
            }else{
                this.checkStatus();
            }
        },
        checkStatus(){
            if(this.user.status == 0){
                console.log('Fazer Usuário Inativo!');
            }
        }
    }
}
</script>

<style>

</style>