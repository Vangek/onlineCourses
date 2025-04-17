import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './style.css'
import "@/assets/css/reset.css"
import "@/styles/global.less"
import "@/styles/responsive.less"
import ResponsiveScale from './utils/responsive'

// 计算滚动条宽度并设置 CSS 变量
const calculateScrollbarWidth = () => {
  const outer = document.createElement('div')
  outer.className = 'scrollbar-measure'
  document.body.appendChild(outer)
  const scrollbarWidth = outer.offsetWidth - outer.clientWidth
  document.body.removeChild(outer)
  document.documentElement.style.setProperty('--el-scrollbar-width', `${scrollbarWidth}px`)
  // 保存原始右侧位置
  document.querySelectorAll('.floating-menu').forEach(el => {
    const style = window.getComputedStyle(el)
    const right = style.getPropertyValue('right')
    document.documentElement.style.setProperty('--original-right', right)
  })
}
const app = createApp(App)
const pinia = createPinia()

// 注册Element Plus
app.use(ElementPlus)
app.use(i18n)

// 全局注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 必须在使用任何 store 之前注册 pinia
app.use(pinia)
app.use(router)

// 在挂载应用前计算滚动条宽度
calculateScrollbarWidth()

// 初始化响应式缩放（仅在非移动设备上启用）
if (window.innerWidth <= 1366 && window.innerWidth >= 1280) {
  // 针对1366*768等小屏幕分辨率特殊处理
  const responsiveScale = new ResponsiveScale({
    designWidth: 1920,
    designHeight: 1080,
    scaleMode: 'both'
  })

  // 在应用挂载后初始化响应式缩放
  app.mount('#app')
  setTimeout(() => {
    responsiveScale.init('#app')
  }, 100)
} else {
  // 正常挂载应用
  app.mount('#app')
}
