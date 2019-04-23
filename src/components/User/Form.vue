<template>
  <div class="user-form" @keyup.enter="submit" @keyup.esc="$router.push({ name: 'user-index' })">
    <div class="form-group">
      <label>Имя</label>
      <input type="text" class="form-control" v-model="user.firstName" />
    </div>
    <div class="form-group">
      <label>Фамилия</label>
      <input type="text" class="form-control" v-model="localUser.lastName" />
    </div>

    <div class="form-group">
      <label>Email</label>
      <input type="text" class="form-control" v-model="localUser.email" />
    </div>
    <div class="form-group">
      <label>Телефон</label>
      <input type="text" class="form-control" v-model="localUser.phone" />
    </div>
    <div class="form-group">
      <label>Адрес</label>
      <input type="text" class="form-control" v-model="localUser.address" />
    </div>
    <div class="form-group">
      <label>Компания</label>
      <input type="text" class="form-control" v-model="localUser.company" />
    </div>
    <div class="form-group">
      <label>Баланс</label>
      <input type="text" class="form-control" v-model="localUser.balance" />
    </div>
  </div>
</template>

<script>
import isEqual from "lodash/isEqual";

export default {
  name: "UserForm",
  props: {
    user: { type: Object, required: true },
    action: String,
  },
  model: {
    prop: "user",
    event: "update",
  },
  data: () => ({
    localUser: null,
  }),
  watch: {
    localUser: {
      deep: true,
      handler() {
        console.log("Try emit update");
        if (!isEqual(this.localUser, this.user)) {
          console.log("Emit update");
          this.$emit("update", Object.assign({}, this.localUser));
        }
      },
    },
    user: {
      deep: true,
      handler() {
        if (!isEqual(this.localUser, this.user)) {
          console.log("User update");
          this.loadUser();
        }
      },
    },
  },
  methods: {
    submit: function() {
      console.log("submit");
      this.$emit("save", { test: "test" });
    },
    loadUser: function() {
      this.localUser = Object.assign({}, this.user);
    },
  },
  created() {
    console.log("Created");
    this.loadUser();
  },
};
</script>
