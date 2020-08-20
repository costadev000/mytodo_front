<template>
    <v-card dark :color="color" class="elevaion-12 mx-auto" max-width="400" >
        <v-list-item>
            <v-list-item-content>
            <div class="headline mb-4"><strong>{{ title }}</strong></div>
            <v-list-item-title class="headline mb-1">{{ subtitle }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
            tile
            size="80"
            >
            <v-icon size="80">{{ icon }}</v-icon>
            </v-list-item-avatar>
        </v-list-item>
    </v-card>
</template>

<script>
export default {
    props: [
        'color',
        'title',
        'subtitle',
        'icon'
    ]

}
</script>

<style>

</style>