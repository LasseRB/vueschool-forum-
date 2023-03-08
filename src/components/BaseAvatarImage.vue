<template>
  <img :src="src || '/user-placeholder.webp'" />
</template>

<script>
export default {
  name: "BaseAvatarImage",
  props: {
    src: {type: String}
  }
}
</script>

<style scoped>

</style>
