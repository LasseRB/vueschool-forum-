<template>
  <div class="profile-card">
    <form @submit.prevent="save">
      <div class="text-center avatar-edit">
        <label for="avatar" >
          <BaseAvatarImage
            :src="activeUser.avatar"
            :alt="`${activeUser.name} profile picture`"
            class="avatar-xlarge img-update"
          />
          <div class="avatar-upload-overlay">
            <BaseSpinner v-if="uploadingImage" color="white" />
            <fa v-else icon="camera" size="3x" :style="{color: 'white', opacity: '.8'}" />
          </div>
          <input v-show="false" type="file" id="avatar" accept="image/*" @change="handleAvatarUpload" />
        </label>
      </div>

      <div class="form-group">
        <input
          v-model="activeUser.username"
          type="text"
          placeholder="Username"
          class="form-input text-lead text-bold"
        />
      </div>

      <div class="form-group">
        <input
          v-model="activeUser.name"
          type="text"
          placeholder="Full Name"
          class="form-input text-lead"
        />
      </div>

      <div class="form-group">
        <label for="user_bio">Bio</label>
        <textarea
          v-model="activeUser.bio"
          class="form-input"
          id="user_bio"
          placeholder="Write a few words about yourself."
        ></textarea>
      </div>

      <div class="stats">
        <span>{{ user.postsCount }} posts</span>
        <span>{{ user.threadsCount }} threads</span>
      </div>

      <hr/>

      <div class="form-group">
        <label class="form-label" for="user_website">Website</label>
        <input
          v-model="activeUser.website"
          autocomplete="off"
          class="form-input"
          id="user_website"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="user_email">Email</label>
        <input
          v-model="activeUser.email"
          autocomplete="off"
          class="form-input"
          id="user_email"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="user_location">Location</label>
        <input
          v-model="activeUser.location"
          autocomplete="off"
          class="form-input"
          id="user_location"
        />
      </div>

      <div class="btn-group space-between">
        <button class="btn-ghost" @click.prevent="cancel">Cancel</button>
        <button type="submit" class="btn-blue">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import BaseSpinner from "@/components/BaseSpinner.vue";

export default {
  components: {BaseSpinner},
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      uploadingImage: false,
      activeUser: {...this.user}
    }
  },
  methods: {
    ...mapActions('auth', ['uploadAvatar']),
    async handleAvatarUpload(e) {
      this.uploadingImage = true
      const file = e.target.files[0]
      const uploadedImage = await this.uploadAvatar({file})
      this.activeUser.avatar = uploadedImage || this.activeUser.avatar
      this.uploadingImage = false
    },
    save() {
      this.$store.dispatch('users/updateUser', {...this.activeUser})
      this.$router.push({name: 'Profile'})
    },
    cancel() {
      this.$router.push({name: 'Profile'})
    }

  }
}
</script>
