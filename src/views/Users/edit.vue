<template>
  <div class="user-edit">
    <div class="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Edit {{ user.firstName }} - {{ $route.params.id }}</h1>
      <router-link :to="{ name: 'user-index'}" class="ml-3 btn btn-sm btn-outline-secondary">
          Back
      </router-link>
    </div>
    <user-form :user="user"></user-form>
  </div>
</template>

<script>
// @ is an alias to /src
import UserForm from "@/components/User/Form.vue";
import Axios from 'axios';

export default {
  name: "user-edit",
  components: {
    UserForm
  },
  data: function() {
      return {
          user: {}
      }
  },
  mounted(){
      Axios
      .get('http://localhost:3000/users', {
          params: {id: this.$route.params.id}
      }).then(res => {
          console.log(res);
          this.user = res.data[0];
      }).catch(err => {
          console.warn('Error: ' + err);
      })
  }
};
</script>