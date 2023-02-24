<template>
  <div class="col-full text-center">
    <h2>Page not found!</h2>
    <router-link :to="{name:'Home'}">Read some kewl threads</router-link>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
    created () {
      this.$emit('ready')
    }
}
</script>

<style scoped>

</style>
