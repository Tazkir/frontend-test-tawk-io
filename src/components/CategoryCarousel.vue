<template>
  <div class="category-carousel" v-if="currentCategoryId">
    <h2>Other Categories</h2>
    <div class="carousel-wrapper">
      <button class="carousel-button prev" @click="prevSlide">&lt;</button>
      <div class="carousel-container">
        <div class="categories-section" ref="carousel">
          <div
            class="category-card"
            v-for="category in filteredCategories"
            :key="category.id"
            @click="navigateToCategory(category.id)"
          >
            <component :is="getIconComponent(category.id)" />
            <h1>{{ category.title }}</h1>
            <p>
              {{ category.totalArticle }} articles
              <span>Last update {{ formatDate(category.updatedOn) }}</span>
            </p>
          </div>
        </div>
      </div>
      <button class="carousel-button next" @click="nextSlide">&gt;</button>
    </div>
  </div>
</template>

<script>
import PlayIcon from "./Icons/PlayIcon.vue";
import CartIcon from "./Icons/CartIcon.vue";
import DiamondIcon from "./Icons/DiamondIcon.vue";
import LinkIcon from "./Icons/LinkIcon.vue";
import MessageIcon from "./Icons/MessageIcon.vue";
import MonitorIcon from "./Icons/MonitorIcon.vue";
import axios from "axios";
import { formatDate } from "../utils/formatDate";

export default {
  name: "CategoryCarousel",
  components: {
    PlayIcon,
    CartIcon,
    DiamondIcon,
    LinkIcon,
    MessageIcon,
    MonitorIcon,
  },
  props: {
    currentCategoryId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      categories: [],
      currentSlide: 0,
    };
  },
  computed: {
    filteredCategories() {
      return this.categories.filter(
        (category) => category.id !== this.currentCategoryId
      );
    },
    apiBaseUrl() {
      return process.env.VUE_APP_URL || "http://localhost:9000";
    },
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get(`${this.apiBaseUrl}/api/categories`);
        this.categories = response.data
          .filter((category) => category.id !== this.currentCategoryId)
          .filter((category) => category.enabled)
          .sort((a, b) => a.order - b.order);
      } catch (error) {
        console.error(
          "Error fetching categories:",
          error.response || error.message || error
        );
      }
    },
    formatDate,
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
    navigateToCategory(categoryId) {
      this.$router.push(`/category/${categoryId}`);
    },
    nextSlide() {
      if (this.currentSlide < this.filteredCategories.length - 1) {
        this.currentSlide++;
        this.updateCarousel();
      }
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
        this.updateCarousel();
      }
    },
    updateCarousel() {
      const carousel = this.$refs.carousel;
      if (carousel) {
        const cardElement = carousel.querySelector(".category-card");
        if (cardElement) {
          const cardWidth = cardElement.offsetWidth;
          carousel.style.transform = `translateX(-${
            this.currentSlide * (cardWidth + 27)
          }px)`;
        }
      }
    },
  },
  watch: {
    currentCategoryId: {
      immediate: true,
      handler() {
        this.fetchCategories();
      },
    },
  },
  mounted() {
    window.addEventListener("resize", this.updateCarousel);
    this.$nextTick(() => {
      this.updateCarousel();
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateCarousel);
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables.scss";

.category-carousel {
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  h2 {
    font-family: "Lato", sans-serif;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: gray;
  }
}

.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.categories-section {
  display: flex;
  transition: transform 0.3s ease;
  gap: 1.7rem;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  color: gray;
  border: none;
  border-radius: 50%;
  padding: 10px 15px;
  font-size: 18px;
  cursor: pointer;
  z-index: 10;

  &.prev {
    left: -5rem;
  }

  &.next {
    right: -5rem;
  }
}

.category-card {
  flex: 0 0 auto;
  width: 30rem;
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
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h1 {
    font-size: 20px;
    font-weight: 700;
    font-family: "Lato", sans-serif;
  }

  p {
    font-size: 16px;
    font-weight: 400;
    font-family: "Lato", sans-serif;
    color: $green;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  span {
    color: $text-gray;
    font-size: 15px;
    font-weight: 300;
    font-family: "Lato", sans-serif;
  }
}
</style>
