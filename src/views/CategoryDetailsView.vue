<template>
  <CategorySection :categoryId="categoryId" :searchQuery="searchQuery" />
</template>

<script>
import CategorySection from "../components/CategorySection.vue";

export default {
  components: {
    CategorySection,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    searchQuery: {
      type: String,
      default: "",
    },
  },
  computed: {
    categoryId() {
      return this.id;
    },
  },
};
</script>
