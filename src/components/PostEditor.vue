<template>
  <div class="col-full">
    <form @submit.prevent="save" @keyup.ctrl.enter.prevent="save">
      <div class="form-group">
        <textarea v-model="postCopy.text" cols="30" rows="10" class="form-input"></textarea>
      </div>
      <div class="form-action">
        <button class="btn-blue">{{post?.id ? 'Update Post' : 'Submit post'}}</button>
      </div>
    </form>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "PostEditor",
  props: {
    post: { type: Object, default: () => ({ text: null }) }
  },
  data() {
    return {
      postCopy: { ...this.post }
    }
  },
  methods: {
    save() {
      this.$emit('save-post', { post: this.postCopy }) // access under eventData.post
      this.postCopy.text = ''
    },
  }

}
</script>

<style scoped>

</style>
