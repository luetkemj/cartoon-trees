<template>
  <div
    v-bind:class="$style.container"
    v-bind:style="{backgroundImage: `url(${image})`}"
  />
</template>

<script>
export default {
  name: 'Thumbnail',
  props: {
    image: {
      type: String,
      default: '',
    },
  },
};
</script>

<style module lang="scss">
  .container {
    background-color: #ffffff;
    box-shadow: inset -2px -2px 0 0 #979797;
    background-size: cover;
    background-position: center center;
    transition: transform 150ms ease, box-shadow 150ms ease;

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

    &:hover {
      transform: scale(1.01);
      box-shadow: inset 0px 0px 0 1px #F8E71C;
    }
  }
</style>
