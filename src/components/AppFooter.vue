<template>
  <div v-bind:class="$style.footer">
    <div v-bind:class="$style.trees"></div>
    <div v-bind:class="$style.content">
      <div v-bind:class="$style.left">
        <p>Made with <span v-bind:class="$style.heart">♥</span> in Austin Texas.</p>
      </div>
      <div v-bind:class="$style.right">
        <!-- <p>Login</p> -->
        <p><a href="https://github.com/luetkemj/cartoon-trees/issues/new">Report a bug</a></p>
        <p><a href="https://github.com/luetkemj/cartoon-trees/issues/new">Request a feature</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style module lang="scss">
.footer {
  p {
    margin: 0;
  }

  a {
    color: #ffffff;
    transition: opacity 300ms ease;
    text-decoration: none;

    &:hover {
      opacity: 0.75;
    }

    &:active {
      opacity: 0.5;
    }
  }
}

.trees {
  background: url('../assets/tree.svg');
  background-repeat: space;
  width: 100vw;
  height: 54px;
}

.content {
  background-color: #3f3f3f;
  font-family: 'Rockwell';
  font-size: 12px;
  line-height: 17px;
  color: #ffffff;
  padding: 24px 16px;

  display: flex;
  justify-content: space-between;
}

.right {
  text-align: right;
}

.heart {
  color: #FF6680;
}
</style>
