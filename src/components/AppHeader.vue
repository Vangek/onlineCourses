<template>
  <header class="app-header" :class="{ 'home-header': isHomePage }">
    <div class="container">
      <!-- 左侧Logo区域 -->
      <div class="logo">
        <div class="logo-icon">
          <!-- <img :src="logoSrc" alt="logo" /> -->
        </div>
      </div>

      <!-- 中间导航菜单 - 使用 el-menu 替代原来的导航 -->
      <nav class="nav-menu">
 
      </nav>

      <!-- 右侧功能区 -->
      <div class="function-area">
        <div class="phone" v-if="!isHomePage">
          <el-icon @click="$router.push('/')"><Back /></el-icon>
        </div>
       
      </div>
    </div>
    <div class="search-btn" @mouseenter="showSearchInput = false" @mouseleave="showSearchInput = false" @click="handleSearch">
      <div class="search-container" :class="{ 'active': showSearchInput }">
        <input 
          type="text" 
          :placeholder="$t('common.search')" 
          class="search-input"
          v-show="showSearchInput"
          v-model="searchText"
          @keyup.enter="handleSearch"
          ref="searchInputRef"
        />
      </div>
      <img src="@/assets/header/search.png" alt="搜索" class="icon-img search-icon"/>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { ref, watch, onMounted, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()  // 使用i18n

const activeMenu = ref('/')

// 搜索相关状态
const showSearchInput = ref(false)
const searchText = ref('')
const searchInputRef = ref<HTMLInputElement | null>(null)

// 处理语言切换
const handleLanguageChange = (command: string) => {
  locale.value = command  // 设置i18n的语区
  // 可以保存用户的语言偏好到localStorage
  localStorage.setItem('language', command)
}

// 计算属性：判断是否在首页，需满足两个条件：
// 1.route.path为首页
const isHomePage = computed(() => {
  return (route.path === '/' || route.path === '/home')
})


// 监听路由变化
watch(() => route.path, (path) => {
  // 只设置主路径，不包括查询参数
  activeMenu.value = path
}, { immediate: true })

// 监听搜索框显示状态，当显示时自动聚焦
watch(showSearchInput, (newVal) => {
  if (newVal) {
    nextTick(() => {
      searchInputRef.value?.focus()
    })
  }
})

// 处理搜索提交
const handleSearch = () => {
  if (searchText.value.trim()) {
    // 跳转到搜索页面并传递查询参数，但默认显示搜索主页
    router.push({
      path: '/search',
      query: { 
        q: searchText.value,
        section: '0' // 修改为初始显示搜索页面主体部分
      }
    })
  } else {
    // 没有输入内容时直接跳转到搜索主页
    router.push({
      path: '/search',
      query: { section: '0' } 
    })
  }
  
  // 隐藏搜索框
  showSearchInput.value = false
}

// 点击搜索图标时
const toggleSearchInput = () => {
  showSearchInput.value = !showSearchInput.value
  if (showSearchInput.value) {
    // 当显示搜索框时，聚焦输入框
    nextTick(() => {
      searchInputRef.value?.focus()
    })
  } else {
    // 清空搜索内容
    searchText.value = ''
  }
}

// 初始化时设置当前路径和语言
onMounted(() => {
  activeMenu.value = route.path
  
  // 从localStorage恢复用户上次的语言设置
  const savedLanguage = localStorage.getItem('language')
  if (savedLanguage) {
    locale.value = savedLanguage
  }
  
  // 处理子菜单高亮
  if (route.path === '/industry' && route.query.section) {
    activeMenu.value = `/industry?section=${route.query.section}`
  }
  if (route.path === '/about' && route.query.section) {
    activeMenu.value = `/about?section=${route.query.section}`
  }
})
</script>

<style scoped lang="less">
.app-header {
  display: flex;
  justify-content: space-between;
  height: 4.375rem; /* 70px */
  background-color: #F4FCFF;
  color: #333;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background-color 0.3s ease;
  
  &.home-header {
    color: #fff;
  }
}

.container {
  width: 90%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 1.25rem; /* 20px */
}

.logo {
  display: flex;
  align-items: center;
  
  &-icon {
    margin-right: 0.625rem; /* 10px */
    width: 9.375rem; /* 150px */
    height: 2.125rem; /* 34px */
    //position: absolute;
    //top: 1rem;
    //left: 5.625rem; 
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

/* 调整导航菜单容器样式 */
.nav-menu {
  flex: 1.5;
  display: flex;
  justify-content: center;
}


.home-header {
  :deep(.el-menu-item.is-active::after) {
    background-color: #fff;
  }
  
  :deep(.el-sub-menu.is-active .el-sub-menu__title::after) {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1.5rem; /* 24px */
    height: 0.125rem; /* 2px */
    background-color: #fff;
    transition: all 0.3s ease;
  }
}

/* 非首页菜单项hover和active样式 */
.app-header:not(.home-header) {
  :deep(.el-menu-item) {
    &:hover {
      background-color: rgba(0, 0, 0, 0.05) !important;
    }
    
    &.is-active::after {
      background-color: #1890ff;
    }
  }
  
  :deep(.el-sub-menu.is-active .el-sub-menu__title::after) {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1.5rem; /* 24px */
    height: 0.125rem; /* 2px */
    background-color: #1890ff;
    transition: all 0.3s ease;
  }
  
  :deep(.el-sub-menu__title:hover) {
    background-color: rgba(0, 0, 0, 0.05) !important;
  }
}

.function-area {
  display: flex;
  align-items: center;
  gap: 1.25rem; /* 20px */
  
  > div {
    display: flex;
    align-items: center;
  }
}

.phone, .lang-switch {
  cursor: pointer;
  
  span {
    margin: 0 0.3125rem; /* 5px */
    color: inherit;
  }
}

.search-btn {
  width: 4.375rem; /* 70px */
  height: 4.375rem; /* 70px */
  background-color: #1890ff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  cursor: pointer;
  margin-left: 0;
  position: relative;
  overflow: visible;
}

.search-container {
  position: absolute;
  right: 100%;
  top: 0;
  height: 100%;
  width: 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  
  &.active {
    width: 25rem; /* 从15rem增加到25rem (400px) */
    border-top-left-radius: 3rem; /* 10px */
    border-bottom-left-radius: 3rem; /* 10px */
  }
}

.search-input {
  width: 100%;
  height: 70%;
  border: none;
  outline: none;
  padding: 0 1rem;
  font-size: 1rem;
  background-color: transparent;
  
  &::placeholder {
    color: #bbb;
    font-style: italic;
  }
}

.icon-img {
  width: 1.25rem; /* 20px */
  height: 1.25rem; /* 20px */
  object-fit: contain;

  &.search-icon {
    width: 1.5rem; /* 调整为更合适的尺寸 */
    height: 1.5rem;
    transition: transform 0.3s ease;
    
    .search-btn:hover & {
      transform: scale(1.1);
    }
  }
}

/* 语言切换下拉菜单样式 */
.lang-switch {
  display: flex;
  align-items: center;
  padding: 0.3125rem 0.625rem;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: transparent;
  }

  &:focus-visible {
    outline: none;
  }
}

.home-header .lang-switch {
  color: #fff;
  
  &:hover {
    background-color: transparent;
  }
}

/* 非首页下拉菜单颜色 */
.app-header:not(.home-header) {
  .lang-switch {
    color: #333;
  }
  
  .phone span {
    color: #333;
  }
}

:deep(.el-dropdown-menu) {
  padding: 0.625rem 0;
  min-width: 6.25rem;
  
  .el-dropdown-menu__item {
    padding: 0.5rem 1.25rem;
    font-size: 0.875rem;
    color: #333;
    cursor: pointer;
    
    &:hover {
      background-color: #f5f7fa;
      color: #1890ff;
    }
  }
}

/* 隐藏导航菜单中的下拉箭头 */
:deep(.el-sub-menu__icon-arrow) {
  display: none !important;
}

/* 一级导航菜单鼠标悬停效果 */
:deep(.el-menu--horizontal > .el-menu-item:not(.is-active):hover),
:deep(.el-menu--horizontal > .el-sub-menu:not(.is-active):hover .el-sub-menu__title) {
  color: #409EFF !important;
  border-bottom-color: transparent !important;
}

/* 确保首页和非首页都应用相同的悬停效果 */
.home-header :deep(.el-menu--horizontal > .el-menu-item:not(.is-active):hover),
.home-header :deep(.el-menu--horizontal > .el-sub-menu:not(.is-active):hover .el-sub-menu__title),
.app-header:not(.home-header) :deep(.el-menu--horizontal > .el-menu-item:not(.is-active):hover),
.app-header:not(.home-header) :deep(.el-menu--horizontal > .el-sub-menu:not(.is-active):hover .el-sub-menu__title) {
  color: #409EFF !important;
}
</style>