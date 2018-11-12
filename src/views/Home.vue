<template>
  <div v-bind:class="$style.home">
    <Thumbnail />
    <Thumbnail />
    <Thumbnail />
    <Thumbnail />
    <Thumbnail />
    <FileUpload />
  </div>
</template>

<script>
// @ is an alias to /src
import FileUpload from '@/components/FileUpload.vue';
import Thumbnail from '@/components/Thumbnail.vue';

export default {
  name: 'home',
  components: {
    FileUpload,
    Thumbnail,
  },
};
</script>

<style module lang="scss">
.home {
  width: calc(100% - 40px);
  max-width: 1024px;
  margin: 0 auto;
  display: grid;
  grid-column-gap: 16px;
  grid-row-gap: 16px;

  @media (min-width: 921px) { grid-template-columns: 1fr 1fr 1fr 1fr 1fr; }
  @media (max-width: 920px) { grid-template-columns: 1fr 1fr 1fr 1fr; }
  @media (max-width: 730px) { grid-template-columns: 1fr 1fr 1fr; }
  @media (max-width: 580px) { grid-template-columns: 1fr 1fr; }
  @media (max-width: 370px) { grid-template-columns: 1fr; }
}
</style>
