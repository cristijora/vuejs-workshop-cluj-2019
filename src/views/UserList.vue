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
                    <div class="bg-white shadow-xl rounded-lg flex items-center p-4">
                        <user-avatar v-bind:name="user.name"
                                     class="rounded-full h-20 mr-4">
                        </user-avatar>
                        <div>
                            <h1 class="text-xl text-gray-700">{{user.name}}</h1>
                            <a v-bind:href="user.website" class="text-purple-600 hover:text-purple-800 cursor-pointer"
                               target="_blank"
                               rel="noopener">
                                {{user.website}}
                            </a>
                            <br>
                            <a v-bind:href="`mailto:${user.email}`" class="text-gray-600 text-sm cursor-pointer">
                                {{user.email}}
                            </a>
                            <br>
                            <a v-bind:href="getGoogleMapsLink(user)"
                               target="_blank"
                               rel="noopener"
                               class="text-gray-600 text-sm cursor-pointer">
                                {{user.address.street}} {{user.address.suite}}, {{user.address.city}}
                            </a>
                        </div>
                    </div>
                </div>
                <no-data v-if="displayNoData" class="w-full mt-8">
                    Could not find users matching "{{searchQuery}}"
                </no-data>
            </div>
        </div>
    </div>
</template>

<script>
  import UserAvatar from '../components/UserAvatar'
  import NoData from '../components/NoData'

  export default {
    name: 'user-list',
    components: {
      UserAvatar,
      NoData
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
    methods: {
      getGoogleMapsLink(user) {
        let { lat, lng } = user.address.geo
        return `https://maps.google.com/?q=${lat},${lng}`
      }
    },
    mounted() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(res => {
          this.users = res
        })
    }
  }
</script>
