<template>
  <div id="app" v-bind:class="$style.app">
    <AppHeader />

    <router-view v-bind:class="$style.view"/>

    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>


<style>
html, body {
  margin: 0;
  padding: 0;
}

h1 {
  margin: 0;
}
</style>


<style module lang="scss">
@import '~normalize.css';

.app {
  // @todo: use @2x bg here
  background-image: url('./assets/beige_paper.png');
  font-family: 'Cubano', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #979797;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.view {
  flex-grow: 1;
}
</style>
