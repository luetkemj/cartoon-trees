<template>
  <div v-bind:class="$style.header">
    <div v-bind:class="$style.trees"></div>
    <h1 v-bind:class="$style.logo">Cartoon<br/> Trees</h1>
    <div v-bind:class="$style.trees"></div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>

<style module lang="scss">
.header {
  padding: 12px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  color: #3F3F3F;
  font-size: 36px;
  line-height: 31px;
  text-shadow: 0 2px 0 #F8E71C;
  position: relative;
  padding: 4px 0 8px 0;
  margin: 0 16px 0 12px;

  &:before {
    content: "";
    position: absolute;
    width: 76px;
    height: 2px;
    background-color: #3F3F3F;
    top: 0;
    left: calc(50% - 38px);
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: calc(50% - 28px);
    width: 56px;
    height: 2px;
    background-color: #3F3F3F;
  }
}

.trees {
  background: url('../assets/tree.svg');
  background-position: center center;
  background-repeat: space;
  width: 300px;
  height: 54px;
}
</style>
