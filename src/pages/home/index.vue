<template>
  <div class="home-page">
    <div class="banner">
      <Banner />
    </div>
    <div class="course">
      <CourseTitle />
      <div class="course-box">
        <CourseItem v-for="item in 9"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, onErrorCaptured, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Banner from '@/components/home/Banner.vue'
import CourseTitle from '@/components/home/CourseTitle.vue'
import CourseItem from '@/components/home/CourseItem.vue'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  console.log('首页组件已挂载')
});

onErrorCaptured((err) => {
  console.error('首页组件捕获到错误:', err)
  return false // 防止错误继续传播
})
</script>

<style lang="less" scoped>
.home-page {
  box-sizing: border-box;
  padding: 0 100px;
  width: 100vw;
  min-height: 100vh;
  overflow: auto;
  position: relative;
  background-color: #fff;

  .banner {
    width: 100%;
    height: 40%;
    margin-top: 15px;
  }

  .course {
    margin-top: 25px;
    width: 100%;

    .course-box {
      margin: 25px 0;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }
  }
}
</style>