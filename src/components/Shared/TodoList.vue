<template>
  <v-card class="elevation-12">
      <v-toolbar
        color="red accent-4"
        dark
      >
        <v-toolbar-title>
            {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.id"
          >
            <v-list-item-avatar>
                <v-icon>{{ checkTodo(item.status) }}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title v-text="item.description"></v-list-item-title>
            </v-list-item-content>


          </v-list-item>
      </v-list>
  </v-card>
</template>

<script>
export default {
    props: [
        'title',
        'items'
    ],
    methods: {
        checkTodo(status){
            if(status == 1){
                return 'check_circle'
            }else{
                return 'schedule'
            }
        }
    }
}
</script>

<style>

</style>