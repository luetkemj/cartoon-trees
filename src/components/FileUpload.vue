<template>
  <div v-bind:class="$style.container">
    <form v-bind:class="$style.form" action="">
      <input
        type="file"
        name="file-upload"
        id="file-upload"
        v-bind:class="{
          [$style.fileUpload]: true,
          [$style.active]: draggingFileOverTarget,
        }"
        @change="onChange($event)"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @drop="onDrop"
      />
      <label v-bind:class="$style.label" for="file-upload">
        <p>
          Drop image<br/>
          here<br/>
          or <span>click</span> to<br/>
          plant a<br/>
          Tree
        </p>
      </label>
    </form>
    <p v-if="loading">LOADING</p>
    <p v-if="error">{{error}}</p>
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
  // .container {}

  .form {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fileUpload {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .label {
    display: block;
    width: calc(100% - 32px);
    margin: 41px 16px 0 16px;
    border: 1px dashed #979797;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 18px;
    line-height: 24px;

    span {
      color: #485F6C;
    }

    // padding trick to scale proportionally 8.5 : 5.5
    // (half sheet of letter or traditonal zine proportions)
    &::before {
      content: '';
      padding-top: calc(154.54545454555% - 32px);
      float: left;
    }

    &::after {
      content: '';
      display: block;
      clear: both;
    }
  }
</style>
