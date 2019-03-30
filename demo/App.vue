<template>
  <div id="app">
    <ComponentDemo/>
  </div>
</template>

<script>
import ComponentDemo from '../docs/.vuepress/components/ComponentDemo'

export default {
  name: 'App',
  components: { ComponentDemo }
}
</script>
