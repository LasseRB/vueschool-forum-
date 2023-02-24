<template>
  <TheNavbar />
  <div class="container">
    <router-view v-show="showPage" @ready="showPage = true"/>
    <BaseSpinner v-show="!showPage" />
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar.vue";
import {mapActions} from "vuex";
import BaseSpinner from "@/components/BaseSpinner.vue";

export default {
  name: 'App',
  components: {BaseSpinner, TheNavbar },
  methods: {
    ...mapActions(['fetchAuthUser'])
  },
  data () {
    return {
      showPage: false
    }
  },
  created () {
    this.fetchAuthUser(),
    this.$router.beforeEach(() => {
      this.showPage = false
    })
  }
}
</script>

<style>
  @import '@/assets/style.css';
</style>
