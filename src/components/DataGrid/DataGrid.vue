<template>
  <div class="data-grid">
    <div class="form-row align-items-center justify-content-between mb-3">
      <div class="col">
        <search v-model="query"></search>
      </div>
      <div class="col-auto">
        <select-offset v-model="offset" limit="50" stepOffset="5"></select-offset>
      </div>
    </div>

    <table class="table table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Company</th>
          <th>Balance</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in dataGrid" :key="user.id">
          <td>{{ index }}</td>
          <td>{{ user.id }}</td>
          <td>{{ user.firstName }} {{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.company }}</td>
          <td>{{ user.balance }}</td>
          <td>
            <router-link :to="{ name: 'user-edit', params: { id: user.id } }">
              <i class="fas fa-edit"></i>
            </router-link>
            <a href="#" @click.prevent="deleteItem(user.id)"><i class="far fa-trash-alt ml-2 text-danger"></i></a>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="row">
      <div class="col">
        <pagination
          :options="{ step: offset, showPages: showPages, countItems: countItems }"
          v-model="currentPage"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "@/axios.js";
import Pagination from "./Pagination";
import SelectOffset from "./SelectOffset";
import Search from "./Search";

export default {
  name: "DataGrid",
  components: { Search, SelectOffset, Pagination },
  data: function() {
    return {
      users: [],
      currentPage: 0,
      offset: 10,
      showPages: 5,
      query: "",
    };
  },
  computed: {
    dataGrid: function() {
      console.log("---");
      return this.users
        .filter(item =>
          this.query.length > 1
            ? ~item.firstName.toLowerCase().indexOf(this.query.toLowerCase()) ||
              ~item.lastName.toLowerCase().indexOf(this.query.toLowerCase()) ||
              ~item.email.toLowerCase().indexOf(this.query.toLowerCase()) ||
              ~item.phone.toLowerCase().indexOf(this.query.toLowerCase())
            : true,
        )
        .filter(
          (item, index) =>
            index >= this.currentPage * this.offset && index < this.currentPage * this.offset + this.offset,
        );
    },
    countItems: function() {
      return this.users.length;
    },
  },
  mounted() {
    Axios.get("/users")
      .then(res => {
        console.log("Data loaded!");
        this.users = res.data;
      })
      .catch(err => {
        console.log("Error: " + err);
      });
  },
  methods: {
    deleteItem: function(id) {
      const confirmed = prompt("Confirm delete this item, type DELETE");

      if (confirmed === "DELETE") {
        console.log("Delete");

        Axios.delete("/users/" + id)
          .then(() => {
            this.users = this.users.filter(item => item.id !== id);
          })
          .catch(err => {
            console.warn("Error: " + err);
          });
      }
    },
  },
};
</script>
