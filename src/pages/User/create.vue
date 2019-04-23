<template>
  <div class="user-edit">
    <div class="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">New user</h1>
      <router-link :to="{ name: 'user-index'}" class="ml-3 btn btn-sm btn-outline-secondary">
          Back
      </router-link>
    </div>

    <div v-if="!user" class="alert alert-warning">Loading...</div>
    <user-form v-else v-model="user" @save="createUser"/>

    <button type="button" class="btn btn-primary" @click="createUser">Create</button>
    <router-link :to="{ name: 'user-index'}" class="ml-2 btn btn-outline-secondary">Cancel</router-link>

  </div>
</template>

<script>
import UserForm from "@/components/User/Form.vue";
import Axios from 'axios';

export default {
  name: "user-create",
  components: {
    UserForm
  },
  data: function() {
      return {
          user: {}
      }
  },
  methods: {
    'createUser': function(){
        this.user.id = 0;
        Axios.post('http://localhost:3000/users/', this.user)
        .then(res => {
            this.$router.push({ name: 'user-index'})
        })
        .catch(err => {console.warn('Error: ' + err);})
    }
  }
};
</script>