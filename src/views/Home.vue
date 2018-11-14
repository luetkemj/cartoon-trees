<template>
  <div :class="$style.home">
    <div v-if="store.state.loadingRootPages" :class="$style.loading">LOADING</div>
    <div v-else :class="$style.content">
      <Thumbnail
        v-for="page in store.state.rootPages"
        :key="page._id"
        :image="page.image.link"
      />
      <FileUpload root />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store';

import FileUpload from '@/components/FileUpload.vue';
import Thumbnail from '@/components/Thumbnail.vue';
import { localRequest } from '@/mixins/http';

export default {
  name: 'home',
  components: {
    FileUpload,
    Thumbnail,
  },
  data: () => ({
    pages: [],
    loading: true,
    store,
  }),
  async created() {
    await this.getRootPages();
  },
  methods: {
    async getRootPages() {
      try {
        const uri = 'http://localhost:3000/api/root-pages';
        const options = { method: 'GET' };
        const data = await localRequest(uri, options);
        store.setLoadingRootPages(false);
        return store.setRootPages(data.data);
      } catch (e) {
        store.setLoadingRootPages(false);
        return this.error = e.message;
      }
    },
  },
};
</script>

<style module lang="scss">
.content {
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
