<template>
  <input class="form-control form-control-lg data-grid__search" type="text" placeholder="Search" @keyup="search" />
</template>

<script>
export default {
  name: "Search",
  model: {
    prop: "query",
    event: "search",
  },
  props: {
    query: {
      type: String,
      required: false,
    },
  },
  methods: {
    search: function(event) {
      this.$emit("search", event.target.value);
    },
  },
};
</script>

<style>
.data-grid__search {
  border: none;
  border-bottom: 1px solid #cccccc;
  border-radius: 0;
  outline: none;
}
.data-grid__search:focus {
  box-shadow: none;
}
</style>
