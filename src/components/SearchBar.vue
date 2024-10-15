<template>
  <form @submit.prevent="handleSearch">
    <div class="search-bar">
      <input
        id="search-input"
        v-model="searchQuery"
        type="text"
        placeholder="Search for answers"
      />
      <button type="submit" id="search-button" :disabled="!searchQuery.trim()">
        <SearchIcon />
      </button>
    </div>
  </form>
</template>

<script>
import SearchIcon from "./Icons/SearchIcon.vue";

export default {
  components: {
    SearchIcon,
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    handleSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({ path: "/", query: { search: this.searchQuery } });
      }
      this.$emit("search", this.searchQuery);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.search-bar {
  width: auto;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 16px;
}

#search-input {
  width: 30%;
  height: 80%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px 0px 0px 5px;
  padding: 10px;
  font-size: 16px;
  line-height: 19.2px;
}

#search-button {
  width: auto;
  height: 54px;
  padding: 0px 20px 0px 20px;
  background-color: $green;
  border-radius: 0 5px 5px 0;
  border: none;
  cursor: pointer;

  &:disabled {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
