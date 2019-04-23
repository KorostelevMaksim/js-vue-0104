<template>
    <div class="user-form">

        <div class="form-group">
            <label>Имя</label>
            <input type="text" class="form-control" v-model="user.firstName" />
        </div>
        <div class="form-group">
            <label>Фамилия</label>
            <input type="text" class="form-control" v-model="user.lastName" />
        </div>
        <div class="form-group">
            <label>Баланс</label>
            <input type="text" class="form-control" v-model="user.balance" />
        </div>
        <div class="form-group">
            <label>Телефон</label>
            <input type="text" class="form-control" v-model="user.phone" />
        </div>
        <div class="form-group">
            <label>Адрес</label>
            <input type="text" class="form-control" v-model="user.address" />
        </div>
        <div class="form-group">
            <label>Компания</label>
            <input type="text" class="form-control" v-model="user.company" />
        </div>

        <button type="submit" class="btn btn-primary">Update</button>
        <router-link :to="{ name: 'user-index'}" class="ml-2 btn btn-outline-secondary">Cancel</router-link>

    </div>
</template>

<script>

    export default {
        name: "user-form",
        props: {
            user: { type: Object, required: true, default: {} },
            action: String
        },
        data: function(){
            return {
                //user: []
            }
        }
    }
    
</script>
