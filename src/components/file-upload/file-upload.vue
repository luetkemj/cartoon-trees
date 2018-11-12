<template>
  <div class="$style.container">
    <form action="">
      <h1>Add New Page</h1>
      <input
        type="file"
        v-bind:class="{
          [$style.fileUpload]: true,
          [$style.active]: draggingFileOverTarget,
        }"
        @change="onChange($event)"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @drop="onDrop"
      />
    </form>
    <p v-if="loading">LOADING</p>
    <p v-if="error">{{error}}</p>

    <img v-bind:src="image" />
  </div>
</template>

<script>
export default {
  name: 'fileUploader',
  data: () => ({
    file: '',
    draggingFileOverTarget: false,
    image: '',
    loading: false,
    error: null,
  }),
  methods: {
    async onChange(e) {
      this.file = e.target.value;
      await this.uploadFile(e.srcElement.files[0]);
    },
    onDragEnter() {
      this.draggingFileOverTarget = true;
    },
    onDragLeave() {
      this.draggingFileOverTarget = false;
    },
    onDrop() {
      this.draggingFileOverTarget = false;
    },
    async uploadFile(file) {
      const reader = new FileReader();
      this.loading = true;
      this.error = null;

      await reader.addEventListener('load', async () => {
        const b64Data = reader.result;
        this.image = b64Data; // eslint-disable-line
        const b64Trimmed = b64Data.replace('data:image/png;base64,', '');
        try {
          await fetch('http://localhost:3000/api/upload-image', {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ file: b64Trimmed }),
          });
          return this.loading = false;
        } catch (e) {
          this.error = e.message;
          return this.loading = false;
        }
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style module lang="scss">
  .container {
    background: blue;
  }

  .fileUpload {
    width: 500px;
    height: 100px;
    border: 1px dashed blue;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: red;
    }

    &.active {
      background: green;
    }
  }
</style>
