<template>
  <div class="user-edit">
    <div class="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Edit {{ user.firstName }} - {{ $route.params.id }}</h1>
      <router-link :to="{ name: 'user-index' }" class="ml-3 btn btn-sm btn-outline-secondary">
        Back
      </router-link>
    </div>

    <div v-if="!user" class="alert alert-warning">Загрузка...</div>
    <user-form v-else v-model="user" @save="updateUser" />

    <button type="button" class="btn btn-primary" @click="updateUser">
      Update
    </button>
    <button type="button" class="btn btn-danger ml-2" @click="deleteUser">
      Delete
    </button>
    <router-link :to="{ name: 'user-index' }" class="ml-2 btn btn-outline-secondary">Cancel</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import UserForm from "@/components/User/Form.vue";
import Axios from "@/axios.js";

export default {
  name: "user-edit",
  components: {
    UserForm,
  },
  data: function() {
    return {
      user: {},
    };
  },
  watch: {
    user: function() {
      console.log("User update");
    },
  },
  mounted() {
    this.loadUser();
  },
  methods: {
    deleteUser: function() {
      const confirmed = prompt("Confirm delete this item, type DELETE");
      if (confirmed === "DELETE") {
        Axios.delete("/users/" + this.$route.params.id, this.user)
          .then(() => {
            this.$router.push({ name: "user-index" });
          })
          .catch(err => {
            console.warn("Error: " + err);
          });
      }
    },
    updateUser: function() {
      Axios.patch("/users/" + this.$route.params.id, this.user)
        .then(() => {
          this.$router.push({ name: "user-index" });
        })
        .catch(err => {
          console.warn("Error: " + err);
        });
    },
    loadUser: function() {
      Axios.get("/users/" + this.$route.params.id)
        .then(res => {
          console.log(res);
          this.user = res.data;
        })
        .catch(err => {
          console.warn("Error: " + err);
        });
    },
  },
};
</script>
