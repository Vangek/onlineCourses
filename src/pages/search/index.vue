<template>
  <div class="search-page">
    搜索
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

</script>

<style scoped>
.search-page {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

</style> 