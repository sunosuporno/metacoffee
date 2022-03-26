import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {auth, initAuth} from './composables/arcanaInit'
import './assets/global.css'
let app

// if(auth){
//     console.log('auth is defined')
//     app = createApp(App).use(router).mount('#app')
// } else {
//     initAuth().then(() => {
//         app = createApp(App).use(router).mount('#app')
//     })
// }
const init = async () => {
    await initAuth()
    app = createApp(App).use(router).mount('#app')    
    return app
}
init()