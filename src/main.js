import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store"
import firebase from 'firebase/compat/app'
import firebaseConfig from '@/config/firebase'
import 'firebase/compat/auth'

import FontAwesome from "@/plugins/FontAwesome";
import ClickOutsideDirective from "@/plugins/ClickOutsideDirective";
import PageScrollDirective from "@/plugins/PageScrollDirective";
firebase.initializeApp(firebaseConfig)

const forumApp = createApp(App)
forumApp.use(router)
forumApp.use(store)
forumApp.use(FontAwesome)
forumApp.use(ClickOutsideDirective)
forumApp.use(PageScrollDirective)
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
