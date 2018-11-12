<template>
  <div v-bind:class="$style.container">
    <img v-bind:src="image" />
  </div>
</template>

<script>
export default {
  name: 'Thumbnail',
};
</script>

<style module lang="scss">
  .container {
    background-color: #ffffff;
    box-shadow: inset -2px -2px 0 0 #979797;

    // padding trick to scale proportionally 8.5 : 5.5
    // (half sheet of letter or traditonal zine proportions)
    &::before {
      content: '';
      padding-top: 154.54545454555%;
      float: left;
    }

    &::after {
      content: '';
      display: block;
      clear: both;
    }
  }
</style>
