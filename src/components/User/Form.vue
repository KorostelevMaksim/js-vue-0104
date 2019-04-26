<template>
  <div class="user-form" @keyup.enter="submit" @keyup.esc="$router.push({ name: 'user-index' })">
    <div class="form-group">
      <label for="is-active">Активен</label>
      <input id="is-active" type="checkbox" class="form-control" name="isActive" v-model="user.isActive" />
    </div>
    <div class="form-group">
      <label for="balance">Баланс</label>
      <input id="balance" type="text" class="form-control" name="balance" v-model="user.balance" />
    </div>
    <div class="form-group">
      <label for="picture">Фото</label>
      <input id="picture" type="text" class="form-control" name="picture" v-model="user.picture" />
      <img :src="user.picture" alt="" class="img-thumbnail mt-3" />
    </div>
    <div class="form-group">
      <label for="age">Возраст</label>
      <input id="age" type="text" class="form-control" name="age" v-model="user.age" />
    </div>
    <div class="form-group">
      <label for="firstName">Имя</label>
      <input id="firstName" type="text" class="form-control" name="firstName" v-model="user.firstName" />
    </div>
    <div class="form-group">
      <label for="lastName">Фамилия</label>
      <input id="lastName" type="text" class="form-control" name="lastName" v-model="user.lastName" />
    </div>
    <div class="form-group">
      <label for="company">Компания</label>
      <input id="company" type="text" class="form-control" name="company" v-model="user.company" />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" type="text" class="form-control" name="email" v-model="user.email" />
    </div>
    <div class="form-group">
      <label for="phone">Телефон</label>
      <input id="phone" type="text" class="form-control" name="phone" v-model="user.phone" />
    </div>
    <div class="form-group">
      <label for="address">Адрес</label>
      <input id="address" type="text" class="form-control" name="address" v-model="user.address" />
    </div>
    <div class="form-group">
      <label for="about">Описание</label>
      <textarea id="about" type="text" class="form-control" name="about" v-model="user.about"></textarea>
    </div>
    <div class="form-group">
      <label for="registered">Дата регистрации</label>
      <input id="registered" type="text" class="form-control" name="registered" v-model="user.registered" />
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
