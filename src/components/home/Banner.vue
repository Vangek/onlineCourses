<template>
  <div class="banner">
    <el-carousel>
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, onErrorCaptured, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

</script>

<style lang="less" scoped>
.banner {
  width: 100%;
  height: 100%;

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>