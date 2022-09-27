import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

import HomeView from './views/HomeView.vue'
import ForumView from './views/ForumView.vue'
import AboutView from './views/AboutView.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/forum',
      name: 'Forum',
      component: ForumView
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView
    }
  ]
})

createApp(App)
  .use(router)
  .use(VueSidebarMenu)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')