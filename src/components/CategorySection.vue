<template>
  <div class="articles-section" v-if="category && articles">
    <div class="category-wrapper">
      <div class="category-card-wrapper">
        <div class="breadcrumbs">
          <span @click="$router.push('/')">All Categories</span>
          <span
            ><svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 9L5 5L1 1"
                stroke="#D3D3D3"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span>{{ category.title }}</span>
        </div>

        <div class="category-card-top">
          <component :is="getIconComponent(categoryId)" />
          <div>
            <h1>{{ category.title }}</h1>
            <p>Update on {{ formatDate(category.updatedOn) }}</p>
          </div>
        </div>

        <div class="category-card-bottom">
          <InfoIcon />
          <p>{{ category.description }}</p>
        </div>
      </div>

      <div class="articles-list">
        <div class="article-card" v-for="article in articles" :key="article.id">
          <div class="article-card-content">
            <FileIcon />
            <div>
              <h1>{{ article.title }}</h1>
              <p>Update on {{ formatDateTime(article.updatedOn) }}</p>
            </div>
          </div>
          <div>
            <svg
              width="11"
              height="20"
              viewBox="0 0 11 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.21802 18.3195L9.65417 9.92577L1.21802 1.53207"
                stroke="#03A84E"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
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
import InfoIcon from "./Icons/InfoIcon.vue";
import FileIcon from "./Icons/FileIcon.vue";
import { formatDate, formatDateTime } from "../utils/formatDate";

export default {
  components: {
    PlayIcon,
    CartIcon,
    DiamondIcon,
    LinkIcon,
    MessageIcon,
    MonitorIcon,
    InfoIcon,
    FileIcon,
  },
  props: {
    categoryId: {
      type: String,
      required: true,
    },
    searchQuery: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      articles: null,
      category: null,
    };
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/category/${this.categoryId}`
        );
        this.articles = response.data.filter(
          (article) => article.status === "published"
        );
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/categories"
        );
        const categories = response.data;
        this.category = categories.find((cat) => cat.id === this.categoryId);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    },
    getIconComponent(iconName) {
      const iconMap = {
        cat1: PlayIcon,
        cat2: MessageIcon,
        cat3: MonitorIcon,
        cat4: LinkIcon,
        cat5: DiamondIcon,
        cat7: CartIcon,
      };
      return iconMap[iconName] || PlayIcon;
    },
    formatDateTime,
    formatDate,
  },
  mounted() {
    this.fetchArticles();
    this.fetchCategories();
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables.scss";

.articles-section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.category-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  gap: 5rem;
}

.category-card-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.3rem;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  border-radius: 3px 3px 0 0;
  padding: 3rem 5rem 3rem 5rem;

  h1 {
    font-size: 1.7rem;
    font-weight: 700;
    font-family: "Lato";
  }

  p {
    font-size: 14px;
    font-weight: 400;
    font-family: "Lato";
    color: gray;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
}

.category-card-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: white;
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 3px 3px;
  border: 1px solid #e0e0e0;
  border-top: none;
  padding: 1.4rem 5rem 1.4rem 5rem;

  p {
    width: 10vw;
    font-size: 14px;
    font-weight: 400;
    font-family: "Lato";
    color: gray;
    text-align: center;
  }
}

.articles-list {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 1rem;
}

.article-card {
  width: 60dvh;
  height: 12%;
  background-color: white;
  padding: 1.5rem 3rem 1.5rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  gap: 1.5rem;
  font-family: "Lato";

  h1 {
    font-size: 1.3rem;
    font-weight: 400;
  }

  p {
    font-size: 13px;
    font-weight: 200;
    color: gray;
  }

  .article-card-content {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 1rem;

    > div {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      gap: 0.5rem;
    }
  }
}

.breadcrumbs {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.7rem;
  font-size: 14px;
  font-weight: 400;
  font-family: "Lato";
  margin-bottom: 1rem;

  > span:first-child {
    color: $green;
    cursor: pointer;
  }

  > span:last-child {
    color: gray;
  }
}
</style>
