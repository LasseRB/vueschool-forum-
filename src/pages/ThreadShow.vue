<template>
  <div v-if="asyncDataStatus_ready" class="col-large push-top">
      <h1>
        {{ thread.title }}
      </h1>
      <router-link
        v-if="thread.userId === authUser?.id"
        :to="{ name: 'ThreadEdit', id: this.id }"
        class="btn-green btn-small"
        custom v-slot="{ navigate }">
        <button @click="navigate" class="btn-green btn-small"> Edit Thread</button>
      </router-link>
      <p>
        By <a href="#" class="link-unstyled">{{ thread.author?.name }}</a>,
        <BaseDate :timestamp="thread.publishedAt"/>
        .
        <span
          style="float:right; margin-top: 2px;"
          class="hide-mobile text-faded text-small"
        >{{ thread.repliesCount }} replies by {{ thread.contributorsCount }} contributors</span
        >
      </p>
      <PostList :posts="threadPosts"/>
      <PostEditor v-if="authUser" @save="addPost"/>
      <div v-else class="text-center" style="margin-bottom: 50px;">
        <router-link :to="{name: 'SignIn', query:{redirectTo: $route.path}}">Sign In</router-link>
        or
        <router-link :to="{name: 'Register',  query:{redirectTo: $route.path}}">Register
        </router-link>
        to reply.
      </div>
    </div>
</template>

<script>

import PostList from "@/components/PostList.vue";
import PostEditor from "@/components/PostEditor.vue";
import {mapActions, mapGetters} from "vuex";
import AsyncDataStatus from "@/mixins/AsyncDataStatus";
import useNotifications from "@/composables/useNotifications";
import {difference} from "lodash";

const threadRecentlyUpdated = 'Thread recently updated';
export default {
  name: 'ThreadShow',
  components: {PostEditor, PostList},
  props: {
    id: {
      required: true,
      type: String
    }
  },
  mixins: [AsyncDataStatus],
  setup() {
    const {addNotification} = useNotifications()
    return { addNotification }
  },
  computed: {
    ...mapGetters('auth', ['authUser']),
    threads() {
      return this.$store.state.threads.items
    },
    posts() {
      return this.$store.state.posts.items
    },
    thread() {
      return this.$store.getters['threads/thread'](this.id)
    },
    threadPosts() {
      return this.posts.filter(post => post.threadId === this.id)
    }
  },
  methods: {
    ...mapActions('threads', ['fetchThread']),
    ...mapActions('users', ['fetchUsers']),
    ...mapActions('posts', ['fetchPosts', 'createPost']),
    async fetchPostsWithUsers(ids) {
      // fetch the posts
      const posts = await this.fetchPosts({
        ids,
        onSnapshot: ({ isLocal, previousItem }) => {
          console.log(isLocal)
          if (!this.asyncDataStatus_ready || isLocal || (previousItem?.edited && !previousItem?.edited?.at)) return

          this.addNotification({message: threadRecentlyUpdated, timeout: 5000})
        }
      })
      // fetch the users associated with the posts
      const users = posts.map(post => post.userId).concat(this.thread.userId)
      await this.fetchUsers({ids: users})
    },

    addPost(eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id,
      }
      this.createPost(post)
    }
  },
  async created () {
    // fetch the thread
    const thread = await this.fetchThread ({
      id: this.id,
      onSnapshot: async ({isLocal, item, previousItem}) => {
        if (!this.asyncDataStatus_ready || isLocal) return

        const newPosts = difference(item.posts, previousItem.posts)
        const hasNewPosts = newPosts.length > 0
        if (hasNewPosts) {
          await this.fetchPostsWithUsers(newPosts)
        } else {
          this.addNotification({ message: threadRecentlyUpdated, timeout: 5000})
        }
      }
    })

    await this.fetchPostsWithUsers(thread.posts)
    this.asyncDataStatus_fetched()
  }
}
</script>
