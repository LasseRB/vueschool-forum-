import Home from '@/pages/Home.vue';
import ThreadShow from "@/pages/ThreadShow.vue";
import NotFound from "@/pages/NotFound.vue";
import ForumPage from "@/pages/ForumPage.vue";
import CategoryPage from "@/pages/CategoryPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import {createRouter, createWebHistory} from 'vue-router'
import ThreadCreate from "@/pages/ThreadCreate.vue";
import ThreadEdit from "@/pages/ThreadEdit.vue";
import {findById} from "@/helpers";
import store from "@/store";
import RegisterUser from "@/pages/RegisterUser.vue";
import SignIn from "@/pages/SignIn.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: {requiresGuest: true}
  },
  {
    path: '/logout',
    name: 'SignOut',
    async beforeEnter(to, from) {
      await store.dispatch('auth/signOut')
      return {name: 'Home'}
    }
  },
  {
    path: '/me',
    name: 'Profile',
    component: ProfilePage,
    meta: {toTop: true, smoothScroll: true, requiresAuth: true},

  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: ProfilePage,
    props: {edit: true},
    meta: {requiresAuth: true}
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: ForumPage,
    props: true
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: CategoryPage,
    props: true
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: ThreadShow,
    props: true,
    beforeEnter: async (to) => {
      await store.dispatch('threads/fetchThread', { id: to.params.id })
      // check if thread exists
      const threadExists = findById(store.state.threads.items, to.params.id)
      if (!threadExists) {
        return {
          name: 'NotFound',
          params: {
            pathMatch: to.path.substring(1).split("/")
          },
          query: to.query,
          hash: to.hash
        }
      }
    }
  },

  {
    path: '/forum/:forumId/thread/create',
    name: 'ThreadCreate',
    component: ThreadCreate,
    props: true,
    meta: {requiresAuth: true}
  },
  {
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    component: ThreadEdit,
    props: true,
    meta: {requiresAuth: true}
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterUser,
    meta: {requiresGuest: true}
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    const scroll = {}
    if (to.meta.toTop) scroll.top = 0
    if (to.meta.smoothScroll) scroll.behavior = 'smooth'
    return scroll
  }
})
router.beforeEach(async (to, from) => {
  await store.dispatch('auth/initAuthentication')
  store.dispatch('auth/unsubscribeAllSnapshots')
  if (to.meta.requiresAuth && !store.state.authId) {
    return { name: 'SignIn', query: { redirectTo: to.path } }
  }
  if (to.meta.requiresGuest && store.state.authId) {
    return { name: 'Home' }
  }
})

export default router
