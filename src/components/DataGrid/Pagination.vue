<template>
  <nav aria-label="">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !prevActive }">
        <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
      </li>
      <template v-for="page in pages">
        <li class="page-item" :class="{ active: page.isActive }" :key="page.num">
          <a class="page-link" href="#" @click.prevent="setPage(page.num)">{{ page.num }}</a>
        </li>
      </template>
      <li class="page-item" :class="{ disabled: !nextActive }">
        <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    options: {
      type: Object,
      required: true,
      default: function () {
        return {
          step: null,
          showPages: null,
          countItems: null
        }
      }
    },
    currentPage: {
      type: Number,
      required: true,

    },
  },
  model: {
    prop: "currentPage",
    event: "setPage",
  },
  watch: {
    options: function() {
      if (this.pages.activePage > this.maxPage) {
        this.setPage(this.maxPage);
      }
    },
  },
  computed: {
    maxPage: function() {
      return Math.ceil(this.options.countItems / this.options.step);
    },
    prevActive: function() {
      return !!this.currentPage;
    },
    nextActive: function() {
      return this.currentPage + 1 !== this.maxPage;
    },
    pages: function() {
      const config = {};

      config.activePage = this.currentPage + 1;
      config.showPages = this.options.showPages;
      config.step = this.options.step;
      config.to = this.options.countItems;
      config.from = 0;
      config.offsetMax = Math.ceil(config.showPages / 2);
      config.offsetMin = Math.floor(config.showPages / 2);
      config.rangePages = config.step * config.showPages;

      /** Определение ограничения показа доступных ссылок пагинации
       * в зависимости от настроек количества показа и активной страницы. */

      if (config.activePage <= config.offsetMax) {
        config.to = config.to < config.rangePages ? config.to : config.rangePages;
      } else if (config.activePage > (this.options.countItems - config.step * config.offsetMax) / config.step) {
        config.from = config.to < config.rangePages ? 0 : this.options.countItems - config.rangePages;
      } else {
        config.from = (config.activePage - config.offsetMax) * config.step;
        config.to = (config.activePage + config.offsetMin) * config.step;
      }

      /** Итератор */
      config[Symbol.iterator] = function() {
        let num = 0;
        let current = this.from;
        let last = this.to;
        let step = this.step;
        let activePage = this.activePage;
        let isActive = false;

        return {
          next() {
            if (current < last) {
              current = current + step;
              num = Math.ceil(current / step);
              isActive = num === activePage;

              return {
                done: false,
                value: {
                  num,
                  isActive,
                },
              };
            } else {
              return { done: true };
            }
          },
        };
      };

      return config;
    },
  },
  methods: {
    setPage: function(page) {
      this.$emit("setPage", page - 1);
    },
    prevPage: function() {
      this.$emit("setPage", this.currentPage - 1);
    },
    nextPage: function() {
      this.$emit("setPage", this.currentPage + 1);
    },
  },
};
</script>
