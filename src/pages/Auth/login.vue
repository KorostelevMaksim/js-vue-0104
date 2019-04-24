<template>
  <div>
    <h1>Login</h1>
    <label>Login</label>
    {{ isLogin }}
    <div v-if="!isLogin">
      <button @click="setLogin" class="btn btn-primary">Set login</button>
    </div>
    <div v-else>
      <button @click="deleteLogin" class="btn btn-danger">Delete login</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  mounted() {
    this.isLogin = localStorage.getItem("PERMISSION") === "yes";
  },
  data: () => {
    return {
      isLogin: false,
    };
  },
  methods: {
    setLogin: function() {
      localStorage.setItem("PERMISSION", "yes");
      this.isLogin = true;
    },
    deleteLogin: function() {
      localStorage.setItem("PERMISSION", "no");
      this.isLogin = false;
    },
  },
};
</script>
