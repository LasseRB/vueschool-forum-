import { upsert, docToResource } from '@/helpers'
export default {
  setItem (state, { resource, item }) {
    console.log('test: state[res]:', state[resource])
    upsert(state[resource], docToResource(item))
  },
  appendUnsubscribe (state, { unsubscribe }) {
    state.unsubscribes.push(unsubscribe)
  },
  clearAllUnsubscribes (state) {
    state.unsubscribes = []
  }
}
