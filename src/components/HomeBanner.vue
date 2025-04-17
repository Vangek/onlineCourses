<template>
  <div class="home-hero">
    <div class="video-container">
      <video ref="videoElement" autoplay loop muted playsinline class="background-video">
        <source :src="videoSource" type="video/mp4">
        您的浏览器不支持 HTML5 视频。
      </video>
      <div class="overlay"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// 直接导入视频文件
import videoSource from '@/assets/video/official_video.mp4'

const videoElement = ref<HTMLVideoElement | null>(null)
const router = useRouter()

onMounted(() => {
  if (videoElement.value) {
    videoElement.value.play().catch(error => {
      console.error('视频播放失败:', error)
    })
  }
})
</script>

<style scoped>
.home-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.background-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色遮罩 */
  z-index: 2;
}

.content {
  z-index: 3;
  text-align: center;
  color: #fff;
  padding: 0 20px;
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.title {
  font-size: 48px;
  font-weight: bold;
  letter-spacing: 2px;
  max-width: 90%;
  margin: 0 auto 20px;
}

.subtitle {
  font-size: 24px;
  opacity: 0.9;
  margin: 0 auto 30px;
}

.cta-button {
  padding: 12px 30px;
  font-size: 18px;
  border-radius: 34px;
  transition: all 0.3s ease;
  background-color: transparent;
  border: 1px solid #fff;
  width: 200px;
  height: 56px;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* 大屏幕 - 1920x1080 */
@media (min-width: 1600px) {
  .title {
    font-size: 48px;
    margin-bottom: 25px;
  }
  
  .subtitle {
    font-size: 24px;
    margin-bottom: 35px;
  }
}

/* 中等屏幕 - 适配1232x587分辨率 */
@media (max-width: 1280px) {
  .title {
    font-size: 36px;
    margin-bottom: 15px;
  }
  
  .subtitle {
    font-size: 20px;
    margin-bottom: 25px;
  }
  
  .cta-button {
    width: 180px;
    height: 50px;
    font-size: 16px;
  }
}

/* 小屏幕 */
@media (max-width: 768px) {
  .title {
    font-size: 28px;
    margin-bottom: 10px;
  }
  
  .subtitle {
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  .cta-button {
    width: 160px;
    height: 45px;
    font-size: 14px;
    padding: 10px 20px;
  }
}
</style>