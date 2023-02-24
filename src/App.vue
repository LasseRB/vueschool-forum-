<template>
  <TheNavbar/>
  <div class="container">
    <router-view v-show="showPage" @ready="onPageReady" :key="$route.path"/>
    <BaseSpinner v-show="!showPage"/>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";
import {mapActions} from "vuex";
import BaseSpinner from "@/components/BaseSpinner";
import NProgress from 'nprogress'

export default {
  name: 'App',
  components: {BaseSpinner, TheNavbar},
  methods: {
    ...mapActions(['fetchAuthUser']),
    onPageReady() {
      this.showPage = true
      NProgress.done()
    }
  },
  data() {
    return {
      showPage: false
    }
  },
  created() {
    this.fetchAuthUser(),
    NProgress.configure({
      speed: 200,
      showSpinner: false
    }),
    this.$router.beforeEach(() => {
      this.showPage = false
      NProgress.start()
    })
  }
}
</script>

<style>
@import '@/assets/style.css';
@import "~nprogress/nprogress.css";
#nprogress .bar{
  background: #57AD8D !important;
}
</style>
