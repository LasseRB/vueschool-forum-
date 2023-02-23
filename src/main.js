import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store"

const forumApp = createApp(App)
forumApp.use(router)
forumApp.use(store)
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
