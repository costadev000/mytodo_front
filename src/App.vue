<template>
  <div id="app">
    <transition-page>
      <router-view></router-view>
    </transition-page>
  </div>
</template>

<script>
import TransitionPage from './components/Shared/TransitionPage';


export default {
  name: `App`,
  components: {
    TransitionPage
  }
}
</script>