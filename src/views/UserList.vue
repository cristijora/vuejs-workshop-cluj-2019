<template>
    <div class="flex flex-col items-center pt-3">
        <div class="text-center">
            <h1 class="text-4xl text-green-500">Vue.js Workshop, Cluj, June 2019</h1>
        </div>
        <div class="max-w-5xl mt-8 w-full">
            <div class="flex justify-center mb-4">
                <input class="h-10 p-4 border rounded outline-none text-lg"
                       type="text"
                       placeholder="Search users..."
                       v-model="searchQuery">
            </div>
            <div class="flex flex-wrap">
                <div v-for="user in filteredUsers"
                     :key="user.id"
                     class="w-full lg:w-1/2 p-4">
                    <user-card v-bind:user="user"></user-card>
                </div>
                <no-data v-if="displayNoData" class="w-full mt-8">
                    Could not find users matching "{{searchQuery}}"
                </no-data>
            </div>
        </div>
    </div>
</template>

<script>
  import NoData from '../components/NoData'
  import UserCard from '../components/UserCard'
  import UserService from '../services/UserService'

  export default {
    name: 'user-list',
    components: {
      NoData,
      UserCard
    },
    data() {
      return {
        users: [],
        searchQuery: ''
      }
    },
    computed: {
      filteredUsers() {
        let query = this.searchQuery
        if (!query) {
          return this.users
        }
        return this.users.filter(user => {
          return user.name.toLowerCase().includes(query.toLowerCase())
        })
      },
      displayNoData() {
        return this.filteredUsers.length === 0 && this.searchQuery
      }
    },
    mounted() {
      UserService.getUsers()
        .then(res => {
          this.users = res
        })
    }
  }
</script>
