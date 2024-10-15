<template>
  <div id="app">
    <nav class="nav-section">
      <Header />
      <SearchBar @search="handleSearch" />
    </nav>
    <main class="main-section">
      <RouterView :searchQuery="searchQuery" />
    </main>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import SearchBar from "./components/SearchBar.vue";

export default {
  name: "App",
  components: {
    Header,
    SearchBar,
    RouterView,
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "scss/main.scss";

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
}

.main-section {
  flex: 1;
  padding: 25px;
  background: #fafafa;
}

.nav-section {
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
}
</style>
