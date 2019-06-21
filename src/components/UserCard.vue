<template>
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
            <a v-bind:href="googleMapsLink"
               target="_blank"
               rel="noopener"
               class="text-gray-600 text-sm cursor-pointer">
                {{user.address.street}} {{user.address.suite}}, {{user.address.city}}
            </a>
        </div>
    </div>
</template>
<script>
  import UserAvatar from './UserAvatar'
  export default {
    name: 'user-card',
    components: {
      UserAvatar
    },
    props: {
      user: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    computed: {
      googleMapsLink() {
        if (!this.user.address) {
          return ''
        }
        let { lat, lng } = this.user.address.geo
        return `https://maps.google.com/?q=${lat},${lng}`
      }
    }
  }
</script>
<style>
</style>
