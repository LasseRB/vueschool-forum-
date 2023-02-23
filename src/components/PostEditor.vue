<template>
  <div class="col-full">
    <form @submit.prevent="save" @keyup.ctrl.enter.prevent="save">
      <div class="form-group">
        <textarea v-model="newPostText" cols="30" rows="10" class="form-input"></textarea>
      </div>
      <div class="form-action">
        <button class="btn-blue">Submit Post</button>
      </div>
    </form>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "PostEditor",
  data() {
    return {
      newPostText: ""
    }
  },
  methods: {
    save() {
      var post = {
        text: this.newPostText,
      }
      this.newPostText = ""
      this.$emit('save-post', { post })
    },
  },
  computed: {
    ...mapGetters({ user: 'authUser' }),
  }
}
</script>

<style scoped>

</style>
