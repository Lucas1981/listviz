<template>
  <div class="root" id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <h1>List viz</h1>
    </nav>

    <div class="container">
      <div class="my-3">
        <file-menu />
      </div>

      <div v-if="loading">
      </div>
      <div v-else>
        <div id="nav">
          <ul class="nav nav-tabs mb-3">
            <li class="nav-item">
              <router-link class="nav-link" :class="{ 'active': activeLink === '/' }" to="/">List</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :class="{ 'active': activeLink === '/viz' }" to="/viz">Viz</router-link>
            </li>
          </ul>
        </div>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FileMenu from '@/components/FileMenu.vue';

@Component({
  components: {
    FileMenu
  }
})
export default class App extends Vue {
  public get loading() { return this.$store.getters.loading; }
  public get activeLink() {
    return this.$route.path;
  }
}
</script>
