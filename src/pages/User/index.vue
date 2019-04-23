<template>
  <div class="users">
    <div class="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Users</h1>
      <router-link :to="{ name: 'user-create' }" class="ml-3 btn btn-sm btn-success"
        >Create user</router-link
      >
    </div>
    <user-list></user-list>
  </div>
</template>

<script>
// @ is an alias to /src
import UserList from "@/components/User/List.vue";

export default {
  name: "users",
  components: {
    UserList,
  },
};
</script>
