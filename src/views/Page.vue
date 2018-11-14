<template>
  <div>
    <div v-if="store.state.loadingPage">LOADING</div>
    <div v-else :class="$style.imageWrapper">
      <img :class="$style.image" :src="store.state.page.image.link" />
    </div>

    <!-- <div>Child pages</div> -->
    <!-- <div>FileUpload with this as parent</div> -->
  </div>
</template>

<script>
import store from '@/store';
import { localRequest } from '@/mixins/http';

export default {
  name: 'page',
  data: () => ({
    store,
  }),

  async created() {
    console.log(this.$route.params.id);
    await this.getPage(this.$route.params.id);
  },
  methods: {
    async getPage(id) {
      try {
        const uri = `http://localhost:3000/api/page/${id}`;
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
</style>
