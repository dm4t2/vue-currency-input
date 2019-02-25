<template>
  <div id="app">
    <h2>Component</h2>
    <ComponentDemo/>
    <h2>Directive</h2>
    <DirectiveDemo/>
  </div>
</template>

<script>
import ComponentDemo from '../docs/.vuepress/components/ComponentDemo'
import DirectiveDemo from '../docs/.vuepress/components/DirectiveDemo'

export default {
  name: 'App',
  components: { DirectiveDemo, ComponentDemo }
}
</script>

<style lang="css">
#app {
  font-family: "Segoe UI", Arial, sans-serif;
}
</style>
