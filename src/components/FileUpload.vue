<template>
  <div v-bind:class="$style.container">
    <form
      v-bind:class="$style.form"
      action=""
      @change="onChange($event)"
      @drop.prevent="onDrop($event)"
      @dragover.prevent=""
    >
      <input
        type="file"
        name="file-upload"
        id="file-upload"
        v-bind:class="$style.fileUpload"
      />
      <label
        v-bind:class="{
          [$style.label]: true,
          [$style.active]: draggingFileOverTarget,
        }"
        for="file-upload"
        v-bind:style="{backgroundImage: `url(${image})`}"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
      >
        <p v-if="advancedUpload && !loading">
          Drop image<br/>
          here<br/>
          or <span>click</span> to<br/>
          plant a<br/>
          Tree
        </p>
        <p v-if="!advancedUpload && !loading">
          <span>click</span> to<br/>
          plant a<br/>
          Tree
        </p>

        <div
          v-if="loading"
          v-bind:class="$style.loading"
        >
          <div v-bind:class="$style.spinner"/>
        </div>
      </label>
    </form>

    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
import { localRequest } from '../mixins/http';

export default {
  name: 'fileUploader',
  data: () => ({
    file: '',
    draggingFileOverTarget: false,
    image: '',
    loading: false,
    error: null,
    advancedUpload: false,
  }),
  created() {
    const div = document.createElement('div');
    const isAdvanced = (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
    if (isAdvanced) this.advancedUpload = true;
  },
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
    async onDrop(e) {
      this.draggingFileOverTarget = false;
      await this.uploadFile(e.dataTransfer.files[0]);
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
          const uri = 'http://localhost:3000/api/upload-image';
          const options = {
            method: 'POST',
            body: JSON.stringify({ file: b64Trimmed }),
          };
          await localRequest(uri, options);
          this.image = '';
          return this.loading = false;
        } catch (e) {
          this.image = '';
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
    position: relative;
    width: calc(100% - 32px);
    margin: 41px 16px 0 16px;
    border: 1px dashed #979797;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    line-height: 24px;
    background-size: cover;
    background-position: top center;
    background-clip: content-box;
    padding: 4px;
    cursor: pointer;
    transition: background-color 300ms ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.75);
    }

    &.active {
      background-color: rgba(255, 255, 255, 0.75);
    }

    span {
      color: #485F6C;
    }

    p {
      pointer-events: none;
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

  .loading {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .spinner {
    width: 50px;
    height: 50px;
    background-image: url('../assets/spinner.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    animation: spin 700ms linear infinite;
  }

  :global {
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }
  }
</style>
