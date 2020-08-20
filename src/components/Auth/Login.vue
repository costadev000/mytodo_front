<template>
  <v-app>
  <v-content>
        <tool-bar 
            toolbarType="icon_btn"
            btn_icon="assignment" 
            btn_title="Registrar" 
            to="/register"
        >
        </tool-bar>
      <v-container
        class="fill-heigth"
        fluid
      >
        <v-row
            align="center"
            justify="center"
        >
            <v-col
                cols="12"
                sm="8"
                md="4"
            >
                <form-card
                    toolbar_icon="account_box"
                    toolbar_title="Login"
                    btn_icon="how_to_reg"
                    btn_text="Entrar"
                    :submit="login"
                >
                    <notification-alert />
                    <ValidationObserver ref="observer">
                        <ValidationProvider name="Email" rules="required">
                            <v-text-field
                                v-model= user.email
                                label="Email"
                                prepend-icon="mdi-account"
                                type="email"
                                required
                            >
                            </v-text-field>
                        </ValidationProvider>
                        <ValidationProvider name="Senha" rules="required">
                            <v-text-field
                                v-model= user.password
                                label="Senha"
                                prepend-icon="mdi-lock"
                                type="password"
                            >
                            </v-text-field>
                        </ValidationProvider>
                        <v-checkbox
                            v-model= "creds"
                            label="Manter-me conectado(a)?"
                        >
                        </v-checkbox>
                    </ValidationObserver>
                </form-card>
            </v-col>
        </v-row>
      </v-container>
  </v-content>
  </v-app>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend, setInteractionMode } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import ToolBar from '../Shared/ToolBar';
import FormCard from '../Shared/FormCard';
import NotificationAlert from '../Shared/NotificationAlert';
import User from '../../domain/Auth/User/User';

setInteractionMode('eager');

extend('required', {
    ...required,
    message: "{_field_} não pode estar vazio!"
});


export default {
    components: {
        ValidationProvider,
        ValidationObserver,
        ToolBar,
        FormCard,
        NotificationAlert
        
    },
    data(){
        return{
            user: new User(),
            creds: false
        }
    },
    created(){
        this.check();
    },
    methods: {
        defUser(user){
            this.user.id = user.id;
            this.user.email = user.email;
            this.user.status = user.status;
            this.user.name = user.name;
            this.$store.commit('SET_USER', {user: this.user});
        },
        check(){
            if(this.$store.state.saveCreds === 'true' && this.$store.state.jwt != ""){
                this.$store.dispatch('REFRESH_TOKEN', {
                    resource: this.$resource, 
                    path:'checkToken', 
                    token: this.$store.state.jwt
                }).then((data) => {
                    this.$store.commit('SET_TOKEN', { token: data.access_token });
                    this.defUser(data.user);
                    this.$router.push('dashboard/home');
                }, err =>{
                    this.$store.commit('SET_NOTIFICATION', {
                        display: true,
                        text: err.body,
                        alertClass: "error",
                        icon: "error"
                    })
                });
            }
        },
        login(){
            
            this.$refs.observer.validate()
                .then(success => {
                    if(!success) return
                    this.$store.dispatch('LOGIN', { user: this.user, resource: this.$resource, path:"login" })
                        .then((data) => {
                            this.$store.commit('SET_TOKEN', { token: data.access_token });
                            this.$store.commit('SET_CREDS', { creds: this.creds });
                            this.defUser(data.user);
                            this.$store.commit('SET_USER', {user: this.user});
                            this.$router.push('dashboard/home');
                        }, err => {
                        this.$store.commit('SET_NOTIFICATION', {
                            display: true,
                            text: err.body,
                            alertClass: "error",
                            icon: "error"
                        });
                        });
                    });
            }
        
        },
        
}
</script>

<style>

</style>