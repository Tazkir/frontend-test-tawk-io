<template>
  <div class="home-section">
    <div class="categories-section">
      <div
        v-for="category in filteredCategories"
        :key="category.id"
        class="category-card"
        @click="goToCategoryDetails(category.id)"
      >
        <component :is="getIconComponent(category.icon)" />
        <h1>{{ category.title }}</h1>
        <p>
          {{ category.totalArticle }} articles
          <span>Last update {{ formatDate(category.updatedOn) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PlayIcon from "./Icons/PlayIcon.vue";
import CartIcon from "./Icons/CartIcon.vue";
import DiamondIcon from "./Icons/DiamondIcon.vue";
import LinkIcon from "./Icons/LinkIcon.vue";
import MessageIcon from "./Icons/MessageIcon.vue";
import MonitorIcon from "./Icons/MonitorIcon.vue";
import { formatDate } from "../utils/formatDate";

export default {
  components: {
    PlayIcon,
    CartIcon,
    DiamondIcon,
    LinkIcon,
    MessageIcon,
    MonitorIcon,
  },
  data() {
    return {
      categories: [],
    };
  },
  props: {
    searchQuery: {
      type: String,
      default: "",
    },
  },
  computed: {
    enabledCategories() {
      return this.categories
        .filter((category) => category.enabled)
        .sort((a, b) => a.order - b.order);
    },
    filteredCategories() {
      if (!this.searchQuery) {
        return this.enabledCategories;
      }
      const query = this.searchQuery.toLowerCase();
      return this.enabledCategories.filter((category) => {
        const categoryTitle = category.title.toLowerCase();
        return categoryTitle.includes(query);
      });
    },
    apiBaseUrl() {
      return process.env.VUE_APP_URL || "http://localhost:9000";
    },
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get(`${this.apiBaseUrl}/api/categories`);
        this.categories = response.data;
      } catch (error) {
        console.error(
          "Error fetching categories:",
          error.response || error.message || error
        );
      }
    },
    getIconComponent(iconName) {
      const iconMap = {
        play: PlayIcon,
        "shopping-cart": CartIcon,
        gem: DiamondIcon,
        link: LinkIcon,
        comment: MessageIcon,
        deskop: MonitorIcon,
      };
      return iconMap[iconName] || PlayIcon;
    },
    goToCategoryDetails(categoryId) {
      this.$router.push({
        name: "CategoryDetails",
        params: { id: categoryId },
      });
    },
    formatDate,
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables.scss";

.home-section {
  width: 100%;
  height: 100%;
  padding: 40px 0px 40px 0px;
}

.categories-section {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  justify-items: center;
  align-items: center;
  row-gap: 30px;
}

@media screen and (max-width: 1324px) {
  .categories-section {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media screen and (max-width: 968px) {
  .categories-section {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

.category-card {
  width: 25rem;
  height: 18rem;
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  gap: 20px;
  cursor: pointer;
}

h1 {
  font-size: 20px;
  font-weight: 700;
  font-family: "Lato";
}

p {
  font-size: 16px;
  font-weight: 400;
  font-family: "Lato";
  color: $green;
  display: flex;
  flex-direction: column;
  align-items: center;
}

span {
  color: $text-gray;
  font-size: 15px;
  font-weight: 300;
  font-family: "Lato";
}
</style>
