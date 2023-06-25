<template>
  <Calculator/>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import Calculator from './views/Calculator.vue'


export default {
  name : 'App', 
  components : {
    Calculator,
  }
}
</script>



<style>
</style>