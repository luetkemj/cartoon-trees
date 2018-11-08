<template>
  <div class="home">
    <FileUpload />
  </div>
</template>

<script>
// @ is an alias to /src
import FileUpload from '@/components/file-upload/file-upload.vue';

export default {
  name: 'home',
  components: {
    FileUpload,
  },
};
</script>
