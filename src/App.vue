<script setup lang="ts">
// 不直接引入布局，让路由系统处理
</script>

<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  height: 100%;
}
</style>
