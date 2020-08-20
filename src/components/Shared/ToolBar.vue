<template>
  <v-app-bar 
    app 
    clipped-left
    color="red darken-2"
    elevation="4"
    dark   
  >
    <v-icon>view_list</v-icon>
    <v-toolbar-title>MyTodo</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn 
        v-if="toolbarType === 'icon_btn'" 
        text 
        :to="to"
    >
        <v-icon>{{ btn_icon }}</v-icon>
        {{ btn_title }}
    </v-btn>
    <v-menu
        v-else
        open-on-hover
        bottom
        offset-y
    >
        <template v-slot:activator="{ on, attrs }">
            
            <v-btn
                text
                v-bind="attrs"
                v-on="on"
            >
                <v-icon>account_circle</v-icon>
                {{ btn_title }}
            </v-btn>
        </template>
        <v-list v-if="toolbarType != 'icon_btn'">
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :to="item.path"
                @click.native = item.action
            >
                <v-list-item-title>
                    <v-icon>{{ item.icon }}</v-icon>
                    {{ item.title }}
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
    name: 'ToolBar',
    props: [
        'toolbarType',
        'btn_title',
    ],
    data() {
        return {
            to: '/register',
            btn_icon: 'assignment',
            userId: 0,
            items: [
                {title: 'Alterar Dados', icon: "settings", path: `/user/${this.userId}`, action: this.teste},
                {title: 'Logout', icon: "power_settings_new", path: '#', action: this.logout}
            ]
        }
        
    },
    methods: {
        logout(){
            this.$store.dispatch('LOGOUT');
            this.$router.push({name: 'login'});
        },
        teste(){
            this.$router.push({name: 'login'});
        }
    }
}
</script>

<style>

</style>