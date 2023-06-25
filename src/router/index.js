import { createRouter, createWebHistory } from 'vue-router'
import Clc from '../views/Calculator.vue'
import AboutUs from '../views/AboutUs.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Clc,
    },
    {
      path: '/About',
      name: 'About',
      component: AboutUs,
    },
  ]
})

export default router