<template>
  <select @change="setOffset" class="custom-select my-1">
    <template v-for="option in options">
      <option :key="option.id" :selected="offset === option.name">{{ option.name }}</option>
    </template>
  </select>
</template>

<script>
export default {
  name: "SelectOffset",
  props: {
    limit: String,
    stepOffset: String,
    offset: Number,
  },
  model: {
    prop: "offset",
    event: "setOffset",
  },
  computed: {
    options: function() {
      const range = {
        from: 0,
        to: parseInt(this.limit),
        _step: parseInt(this.stepOffset),
      };

      range[Symbol.iterator] = function() {
        let current = this.from;
        let last = this.to;
        let step = this._step;
        return {
          next() {
            if (current < last) {
              current = current + step;
              return {
                done: false,
                value: {
                  name: current,
                },
              };
            } else {
              return {
                done: true,
              };
            }
          },
        };
      };

      return range;
    },
  },
  methods: {
    setOffset: function(event) {
      this.$emit("setOffset", parseInt(event.target.value));
    },
  },
};
</script>
