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
    {{file}}
    <img v-bind:src="image" />
  </div>
</template>

<script>

const uploadFile = async (file) => {
  const reader = new FileReader();

  reader.addEventListener('load', async () => {
    try {
      const response = await fetch('http://localhost:3000/api/upload-image', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ file: reader.result.replace('data:image/png;base64,', '') }),
      });

      const json = await response.json();
      console.log(json);
      return json;
    } catch (e) {
      return console.log({ error: e.message });
    }
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
};

export default {
  name: 'fileUploader',
  data: () => ({
    file: '',
    draggingFileOverTarget: false,
    image: '',
  }),
  methods: {
    onChange(e) {
      this.file = e.target.value;
      uploadFile(e.srcElement.files[0]);
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
