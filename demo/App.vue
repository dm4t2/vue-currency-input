<template>
  <div id="app">
    <Playground/>
  </div>
</template>

<script>
import ComponentDemo from './ComponentDemo'
import Playground from '../docs/.vuepress/components/Playground'

export default {
  name: 'App',
  components: { Playground, ComponentDemo }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900");
</style>
