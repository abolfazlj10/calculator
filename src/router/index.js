import { createRouter, createWebHistory } from 'vue-router'
import Clc from '../views/Calculator.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Clc,
    },
  ]
})

export default router