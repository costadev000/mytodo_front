<template>
  <v-card class="elevation-12">
        <v-toolbar
            color="red darken-4"
            elevation="2"
            dark
            flat
        >
            <v-icon>{{ toolbar_icon }}</v-icon>
            <v-toolbar-title>{{ toolbar_title }}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon :to="toolbar_opt_path" v-if="toolbar_opt">
                <v-icon v-if="toolbar_opt">{{ toolbar_opt_icon }}</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card-text>
            <v-form @submit.prevent="submit">
                <slot/>

                <v-btn
                    type="submit"
                    color="#f05545"
                    large
                    dark
                    block
                >
                    <v-icon>{{ btn_icon }}</v-icon>
                    {{ btn_text }}
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: [
        'toolbar_icon',
        'toolbar_title',
        'btn_icon',
        'btn_text',
        'toolbar_opt',
        'toolbar_opt_icon',
        'toolbar_opt_path',
        'submit'
    ],
}
</script>

<style>

</style>