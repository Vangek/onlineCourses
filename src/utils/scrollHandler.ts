/**
 * 滚轮事件处理工具
 * 提供统一的滚轮事件处理逻辑，包括防抖和方向检测
 */

import { ref } from 'vue'

// 默认滚动延迟时间（毫秒）
const DEFAULT_SCROLL_DELAY = 300

// 创建一个全局的滚动状态，确保跨组件的滚动控制
const isScrolling = ref(false)

/**
 * 防抖函数
 * @param fn 要执行的函数
 * @param delay 延迟时间
 */
function debounce(fn: Function, delay: number) {
  let timer: number | null = null
  return function(...args: any[]) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, delay) as unknown as number
  }
}

/**
 * 创建滚轮事件处理器
 * @param onScrollUp 向上滚动时的回调
 * @param onScrollDown 向下滚动时的回调
 * @param options 配置选项
 * @returns 滚轮事件处理函数
 */
export function createWheelHandler(
  onScrollUp: () => void,
  onScrollDown: () => void,
  options: {
    delay?: number,
    preventDefault?: boolean,
    checkLock?: () => boolean
  } = {}
) {
  const {
    delay = DEFAULT_SCROLL_DELAY,
    preventDefault = true,
    checkLock = () => false
  } = options

  // 使用防抖处理滚动方向判断
  const debouncedScrollHandler = debounce((direction: 'up' | 'down') => {
    if (direction === 'up') {
      onScrollUp()
    } else {
      onScrollDown()
    }

    // 设置延迟后重置滚动状态
    setTimeout(() => {
      isScrolling.value = false
    }, delay)
  }, 50) // 50ms的防抖延迟，可以根据需要调整

  return function handleWheel(e: WheelEvent) {
    // 如果需要，阻止默认滚动行为
    // 注意：模板中已移除 .passive 修饰符，所以可以安全地调用 preventDefault
    if (preventDefault) {
      e.preventDefault()
    }

    // 检查是否应该锁定滚动
    if (checkLock()) {
      return
    }

    // 如果正在滚动中，忽略此次滚动事件
    if (isScrolling.value) {
      return
    }

    // 设置滚动状态为true
    isScrolling.value = true

    // 确定滚动方向并调用相应的处理函数
    const direction = e.deltaY < 0 ? 'up' : 'down'
    debouncedScrollHandler(direction)
  }
}

/**
 * 检查滚动状态
 * @returns 当前是否正在滚动
 */
export function isCurrentlyScrolling() {
  return isScrolling.value
}

/**
 * 重置滚动状态
 */
export function resetScrollState() {
  isScrolling.value = false
}
