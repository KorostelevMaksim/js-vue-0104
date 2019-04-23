<template>
    <div class="user-list">
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
                <tr v-for="(user, index) in users" :key="user.id">
                    <td>{{ index }}</td>
                    <td>{{ user.id }}</td>
                    <td>{{ user.firstName }} {{ user.lastName }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phone }}</td>
                    <td>{{ user.company }}</td>
                    <td>{{ user.balance }}</td>
                    <td>
                        <router-link :to="{ name: 'user-edit', params: { id: user.id }}">
                            <i class="fas fa-edit"></i>
                        </router-link>
                        <a href="#" @click.prevent="deleteUser(user.id)"><i class="far fa-trash-alt ml-2 text-danger"></i></a>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import Axios from "axios";

    export default {
        name: "user-list",
        data: function(){
            return {
                users: []
            }
        },
        mounted(){
            Axios.get('http://localhost:3000/users')
            .then( res => {
                console.log('Data loaded!');
                this.users = res.data
            }).catch(err => {
                console.log('Error: ' + err);
            })
        },
        methods: {
            'deleteUser': function(id){

                const confirmed = prompt('Confirm delete this item, type DELETE');

                if(confirmed === 'DELETE'){

                    console.log('Delete');
                
                    Axios.delete('http://localhost:3000/users/' + id)
                    .then(res => {
                        this.users = this.users.filter(item => item.id !== id);                
                    })
                    .catch(err => {console.warn('Error: ' + err);})
                }
            },
        }
    }
</script>
