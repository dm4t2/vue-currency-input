<template>
  <div id="app">
    <Demo/>
  </div>
</template>

<script>
import Demo from '../docs/.vuepress/components/Demo'

export default {
  name: 'App',
  components: { Demo }
}
</script>

<style lang="css">
#app {
  font-family: "Segoe UI", Arial, sans-serif;
}
</style>
