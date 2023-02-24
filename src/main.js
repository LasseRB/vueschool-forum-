import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store"
import firebase from 'firebase/compat/app'
import firebaseConfig from '@/config/firebase'
import 'firebase/compat/auth'

import FontAwesome from "@/plugins/FontAwesome";
firebase.initializeApp(firebaseConfig)
firebase.auth().onAuthStateChanged(user => {
  store.dispatch('unsubscribeAuthUserSnapshot')
  if (user) {
    store.dispatch('fetchAuthUser')
  }
})
const forumApp = createApp(App)
forumApp.use(router)
forumApp.use(store)
forumApp.use(FontAwesome)
findAllBaseComponentsAndAdd(forumApp);

forumApp.mount('#app')
function findAllBaseComponentsAndAdd(app) {
  const requireComponent = require.context('./components', true, /Base[A-Z]\w+\.(vue|js)$/)
  requireComponent.keys().forEach(function (fileName) {
    let baseComponentConfig = requireComponent(fileName)
    baseComponentConfig = baseComponentConfig.default || baseComponentConfig
    const baseComponentName = baseComponentConfig.name || (
      fileName
        .replace(/^.+\//, '')
        .replace(/\.\w+$/, '')
    )
    app.component(baseComponentName, baseComponentConfig)
  })
}
