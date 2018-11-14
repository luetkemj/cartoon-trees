<template>
  <div>
    <div v-if="store.state.loadingPage">LOADING</div>
    <div v-else :class="$style.imageWrapper">
      <img :class="$style.image" :src="store.state.page.image.link" />
    </div>

    <div :class="$style.content">
      <router-link
        v-for="page in store.state.page.children"
        :key="page._id"
        :to="{ name: 'page', params: { id: page._id }}"
      >
        <Thumbnail
          :image="page.image.link"
        />
      </router-link>
      <FileUpload :parent="$route.params.id" />
    </div>
  </div>
</template>

<script>
import store from '@/store';
import { localRequest } from '@/mixins/http';

import FileUpload from '@/components/FileUpload.vue';
import Thumbnail from '@/components/Thumbnail.vue';

export default {
  name: 'page',
  components: {
    FileUpload,
    Thumbnail,
  },
  data: () => ({
    store,
  }),
  async created() {
    await this.getPage();
  },
  watch: {
    // call again the method if the route changes
    $route: 'getPage',
  },
  methods: {
    async getPage() {
      try {
        const uri = `http://localhost:3000/api/page/${this.$route.params.id}`;
        const options = { method: 'GET' };
        const data = await localRequest(uri, options);
        store.setLoadingPage(false);
        return store.setPage(data.data);
      } catch (e) {
        store.setLoadingPage(false);
        return this.error = e.message;
      }
    },
  },
};
</script>

<style module lang="scss">
  .imageWrapper {
    max-width: 700px;
    margin: 0 auto;
  }

  .image {
    width: 100%;
    height: auto;
  }

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
