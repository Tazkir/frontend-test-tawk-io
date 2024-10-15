<template>
  <HomeSection :searchQuery="searchQuery" />
</template>

<script>
import HomeSection from "../components/HomeSection.vue";

export default {
  components: {
    HomeSection,
  },
  props: {
    searchQuery: {
      type: String,
      default: "",
    },
  },
};
</script>
