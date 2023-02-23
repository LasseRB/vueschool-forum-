import Home from '@/pages/Home.vue';
import ThreadShow from "@/pages/ThreadShow.vue";
import NotFound from "@/pages/NotFound.vue";
import ForumPage from "@/pages/ForumPage.vue";
import CategoryPage from "@/pages/CategoryPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import {createRouter, createWebHistory} from 'vue-router'
import sourceData from '@/data.json'
import ThreadCreate from "@/pages/ThreadCreate.vue";
import ThreadEdit from "@/pages/ThreadEdit.vue";
import {findById} from "@/helpers";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/me',
    name: 'Profile',
    component: ProfilePage,
    meta: { toTop: true, smoothScroll: true }
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: ProfilePage,
    props: {edit: true}
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
    props: true
    // beforeEnter:(to)=>
    // {
    //   let threadExists;
    //   threadExists = findById(sourceData.threads, to.params.id);
    //   if (!threadExists) {
    //     console.log(to.params.id, 'findes ikke')
    //     return {
    //       name: 'NotFound',
    //       params: {
    //         pathMatch: to.path.substring(1).split("/")
    //       },
    //       query: to.query,
    //       hash: to.hash
    //     }
    //   }
    // }
  },
  {
    path: '/forum/:forumId/thread/create',
    name: 'ThreadCreate',
    component: ThreadCreate,
    props: true
  },
  {
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    component: ThreadEdit,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]
export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    const scroll = {}
    if (to.meta.toTop) scroll.top = 0
    if (to.meta.smoothScroll) scroll.behavior = 'smooth'
    return scroll
  }
})
