<template>
    <v-app>
        <v-content>
        <v-container
                class="fill-height"
                fluid
        >
            <v-row
                align="center"
                justify="center"
            >
            <v-col
                cols="12"
                md="8"
                sm="9"
            >
                <form-card
                    toolbar_icon="person_add"
                    toolbar_title="Novo Usuário"
                    btn_icon="how_to_reg"
                    btn_text="Cadastrar"
                    toolbar_opt=true
                    toolbar_opt_path="/"
                    toolbar_opt_icon="cancel"
                    :submit="register"
                >
                    <NotificationAlert />
                    <ValidationObserver ref="observer">
                        <ValidationProvider v-slot="{errors}" name="Nome" rules="required">
                            <v-text-field
                                v-model="user.name"
                                label="Nome"
                                :error-messages="errors"
                                prepend-icon="mdi-account"
                                type="text"
                            >
                            </v-text-field>
                        </ValidationProvider>
                        <ValidationProvider v-slot="{errors}" name="Email" rules="required|email">
                            <v-text-field
                                v-model="user.email"
                                label="Email"
                                :error-messages="errors"
                                prepend-icon="mail"
                                type="email"
                            >
                            </v-text-field>
                        </ValidationProvider>
                        <ValidationProvider v-slot="{errors}" name="Senha" rules="required|password:@Confirmar Senha">
                            <v-text-field
                                v-model="user.password"
                                label="Senha"
                                :error-messages="errors"
                                prepend-icon="lock"
                                type="password"
                            >
                            </v-text-field>
                        </ValidationProvider>
                        <ValidationProvider v-slot="{errors}" name="Confirmar Senha" rules="required|password:@Senha">
                            <v-text-field
                                v-model="confirm"
                                label="Confirmar Senha"
                                :error-messages="errors"
                                prepend-icon="enhanced_encryption"
                                type="password"
                            >
                        </v-text-field>
                        </ValidationProvider>
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
import { required, email } from 'vee-validate/dist/rules';
import NotificationAlert from '../Shared/NotificationAlert';
import FormCard from '../Shared/FormCard';
import User from '../../domain/Auth/User/User';

setInteractionMode('eager');

extend('required', {
    ...required,
    message: "{_field_} não pode estar vazio!"
});

extend('email', {
    ...email,
    message: "Digite um Email Válido!"
});

extend('password', {
    params: ['target'],
    validate(value, { target }) {
        return value === target;
    },
    message: "Os Campos senha e Confirmar senha devem ser idênticos!"
})

export default {
    components: {
        FormCard,
        NotificationAlert,
        ValidationProvider,
        ValidationObserver
    },
    data() {
        return {
            user: new User(),
            confirm: ''
        }
    },
    methods: {
        register(){
            this.$refs.observer.validate()
                .then(success => {
                    if(!success) return
                    this.$store.dispatch('REGISTER', {user: this.user, resource: this.$resource, path: 'user'})
                        .then((data) => {
                            this.$store.commit('SET_NOTIFICATION', {
                                display: true,
                                text: data.body,
                                alertClass: 'success',
                                icon: 'how_to_reg'
                            });
                            this.$router.push({name: 'login'});
                        }, err => {
                            this.$store.commit('SET_NOTIFICATION', {
                                display: true,
                                text: err.body,
                                alertClass: 'error',
                                icon: 'how_to_reg'
                            });
                        })
                });
        }
    }


}
</script>

<style>

</style>