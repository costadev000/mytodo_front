<template>
  <v-alert
    desne
    border-left
    dark
    dismissible
    v-model="alert"
    :color="NOTIFICATION.alertClass"
  >
      <v-icon>{{ NOTIFICATION.icon }}</v-icon>
      <span > {{ NOTIFICATION.text }}</span>
  </v-alert>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'NotificationAlert',
    computed: {
        ...mapGetters(["NOTIFICATION"]),
        alert: {
           get () {
               return this.$store.getters.NOTIFICATION.display;
           },
           set (value) {
               this.$store.commit("SET_NOTIFICATION", {
                   display: value.display || false
               })
           }
        }
    }
}
</script>

<style>

</style>