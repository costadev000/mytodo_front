<template>
  <v-container fluid full-height>
    <v-layout
          justify-center
    >
      <v-flex>
        <v-card class="elevation-12">
          <v-container fluid>
            <v-row>

              <v-col cols="12" sm="12" md="6">
                <dash-cards
                  color="green accent-4"
                  title="Tarefas Concluídas"
                  subtitle="X"
                  icon="check"
                >
                </dash-cards>
              </v-col>

              <v-col cols="12" sm="12" md="6">
                <dash-cards
                  color="yellow accent-4"
                  title="A Fazer"
                  subtitle="X"
                  icon="query_builder"
                >
                </dash-cards>
              </v-col>
            </v-row>

            <v-row>
              <todo-list
                title= "Ultimas Tarefas"
                :list="list"
              ></todo-list>
            </v-row>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  
</template>

<script>
import DashCards from '../Shared/DashCards';
import TodoList from '../Shared/TodoList';
import { mapGetters } from 'vuex';
export default {
  components: {
    DashCards,
    TodoList
  },
  data(){
    return {
      list: []
    }
  },
  computed: {
    ...mapGetters(["USER"]),
    user: {
      get(){
        return this.$store.getters.USER;
      },
      set (user){
                return this.$store.commit('SET_USER', {user: user});
      }
    }
    
  },
  created(){
    console.log(this.$store.dispatch('GET_LAST_TODOS', {quant: 5, userId: this.user.id, resource: this.$resource, path: "todo/lastTodos"}))
  }
}
</script>

<style>

</style>