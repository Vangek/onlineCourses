<template>
  <div class="course-item">
    <img class="img" src="../../assets/search/no-results.jpg" alt="">
    <div class="course-info">
      <div class="course-name">XXX课</div>
      <div class="course-description">
        <div class="description">XX老师开设的课</div>
        <div class="star">
          <el-button link :icon="isFavorited ? StarFilled : Star" :type="isFavorited ? 'warning' : 'default'"
            @click="toggleFavorite">
            {{ isFavorited ? '已收藏' : '收藏' }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, onErrorCaptured, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
import { Star, StarFilled } from '@element-plus/icons-vue';

const isFavorited = ref(false); // 默认未收藏

const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value;
  // 这里可以发送 API 请求，更新服务器状态
  console.log(isFavorited.value ? '已收藏' : '取消收藏');
};

</script>

<style lang="less" scoped>
.course-item {
  display: flex;
  flex-direction: column;
  height: 275px;
  background: #f0f0f0;
  transition: transform 0.3s ease;

  .img {
    width: 100%;
    height: 70%;
  }

  .course-info {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    height: 30%;
    padding: 10px;

    .course-description {
      width: 100%;
      height: 35px;
      display: flex;

      .description {
        text-align: left;
        width: 70%;
        overflow: hidden;
      }

      .star {
        width: 30%;
      }
    }
  }
}

.course-item:hover {
  transform: translateY(-10px);
  z-index: 1;
}
</style>