<template>
    <img v-bind:src="imgSrc" v-bind:alt="name">
</template>
<script>
  export default {
    props: {
      name: {
        type: String,
        default: ''
      }
    },
    computed: {
      imgSrc() {
        let characters = this.name.split(' ')
          .map(word => word.charAt(0))
          .join('')
        return `https://avatar.tobi.sh/${this.name}.svg?text=${characters}`
      }
    }
  }
</script>
