<template>
  <div id="app" class="d-flex">
    <Navbar id="nav" class="w-25"/>
    <div id="header-router" class="w-75">
      <Header class="w-100" />
      <router-view v-if="this.$route.path.includes('add')
                      || this.$route.path.includes('edit')"
      >
      </router-view>
    </div>
  </div>
</template>

<script src="https://www.gstatic.com/firebasejs/7.9.3/firebase-app.js"></script>
<script lang="ts">
import Navbar from './components/NavBar/Navbar.vue';
import Header from './components/Header/Header.vue';


export default {
  components: {
    Navbar,
    Header,
  }
};
</script>

<style lang="scss">
  #app {
    height: 100%;
  }

  @media (max-width: 576px) {
    #nav, #header-router {
      width: 50% !important;
    }
  }
</style>
