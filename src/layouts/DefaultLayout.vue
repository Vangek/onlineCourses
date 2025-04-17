<template>
  <div class="default-layout">
    <app-header />
    <div class="cushion"></div>
    <div class="page-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<style scoped>
.default-layout {
  width: 100%;
  height: 100%;
}

.cushion {
  /* 默认不设置高度 */
  height: auto;
}

/* 大屏幕 - 1401及以上 */
@media (min-width: 1401px) {
  .cushion {
    height: 70px;
  }
}

/* 小屏幕 - 1400px及以下 */
@media (max-width: 1400px) {
  .cushion {
    height: 45px;
  }
}

.page-content {
  width: 100%;
  height: auto;
}

/* 大屏幕 - 1920x1080及以上 */
@media (min-width: 1401px) {
  .page-content {
    height: calc(100% - 70px);
  }
}

/* 小屏幕 - 1280px及以下 */
@media (max-width: 1400px) {
  .page-content {
    height: calc(100% - 45px);
  }
}
</style>