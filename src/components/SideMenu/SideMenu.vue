<template>
  <v-navigation-drawer
    color="red darken-4"
    app
    dark
    clipped
    :mini-variant = "isMobile"
    permanent
  >
    <v-list
      :shaped="shaped"
    >
      <v-list-item
        v-for="route in routes[0].children"
        :key="route.id"
        :to="route.path"
        link
      >
        <v-list-item-avatar>
          <v-icon v-text="route.icon"></v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="route.name"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { routes } from '../../routes';

export default {
  data(){
    return{
      routes: routes.filter(route => route.children),
      isMobile: false,
      shaped: true
    }
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },
  methods: {
    onResize () {
      this.isMobile = window.innerWidth < 600
      this.shaped = window.innerWidth > 600
    }
  },
}
</script>

<style>

</style>