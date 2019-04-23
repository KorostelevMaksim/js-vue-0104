<template>
    <div class="user-list">
        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Balance</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                    <td>{{ index }}</td>
                    <td>{{ user.firstName }} {{ user.lastName }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phone }}</td>
                    <td>{{ user.balance }}</td>
                    <td>
                        <router-link :to="{ name: 'user-edit', params: { id: user.id }}">Edit</router-link>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "user-list",
        data: function(){
            return {
                users: []
            }
        },
        mounted(){
            axios.get('http://localhost:3000/users')
            .then( res => {
                console.log('Data loaded!');
                this.users = res.data
            }).catch(err => {
                console.log('Error: ' + err);
            })
        }
    }
</script>
