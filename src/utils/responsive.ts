/**
 * 响应式缩放工具
 * 根据设计稿尺寸和当前屏幕尺寸自动调整页面缩放比例
 */

interface ResponsiveOptions {
  designWidth: number;
  designHeight: number;
  minWidth?: number;
  minHeight?: number;
  scaleMode?: 'width' | 'height' | 'both';
}

class ResponsiveScale {
  private options: ResponsiveOptions;
  private rootElement: HTMLElement | null = null;
  private resizeObserver: ResizeObserver | null = null;

  constructor(options: ResponsiveOptions) {
    // 默认配置
    this.options = {
      minWidth: 1280,
      minHeight: 720,
      scaleMode: 'both',
      // 使用传入的选项覆盖默认值
      ...options
    };
  }

  /**
   * 初始化响应式缩放
   * @param rootElement 根元素，默认为document.body
   */
  public init(rootElement: HTMLElement | string = document.body): void {
    if (typeof rootElement === 'string') {
      const el = document.querySelector(rootElement);
      if (el instanceof HTMLElement) {
        this.rootElement = el;
      } else {
        console.error('ResponsiveScale: Root element not found');
        return;
      }
    } else {
      this.rootElement = rootElement;
    }

    // 设置根元素样式
    if (this.rootElement) {
      this.rootElement.style.transformOrigin = 'top left';
      this.rootElement.style.position = 'absolute';
      this.rootElement.style.width = `${this.options.designWidth}px`;
      this.rootElement.style.height = `${this.options.designHeight}px`;
    }

    // 初始应用缩放
    this.applyScale();

    // 监听窗口大小变化
    window.addEventListener('resize', this.handleResize.bind(this));

    // 使用ResizeObserver监听容器大小变化
    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
      if (this.rootElement) {
        this.resizeObserver.observe(this.rootElement);
      }
    }
  }

  /**
   * 应用缩放
   */
  private applyScale(): void {
    if (!this.rootElement) return;

    const { designWidth, designHeight, minWidth, minHeight, scaleMode } = this.options;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // 计算缩放比例
    let scaleX = windowWidth / designWidth;
    let scaleY = windowHeight / designHeight;
    let scale = 1;

    // 根据缩放模式选择缩放比例
    switch (scaleMode) {
      case 'width':
        scale = scaleX;
        break;
      case 'height':
        scale = scaleY;
        break;
      case 'both':
      default:
        // 取较小值，确保内容完全显示
        scale = Math.min(scaleX, scaleY);
        break;
    }

    // 应用缩放
    this.rootElement.style.transform = `scale(${scale})`;

    // 调整容器大小，确保滚动条正确显示
    document.body.style.width = `${designWidth * scale}px`;
    document.body.style.height = `${designHeight * scale}px`;
    document.body.style.overflow = 'auto';

    // 特殊处理1366*768分辨率
    if (windowWidth <= 1366 && windowWidth > 1280) {
      // 可以添加特殊处理逻辑
      console.log('Applying special handling for 1366*768 resolution');
    }
  }

  /**
   * 处理窗口大小变化
   */
  private handleResize(): void {
    this.applyScale();
  }

  /**
   * 销毁实例，移除事件监听
   */
  public destroy(): void {
    window.removeEventListener('resize', this.handleResize.bind(this));

    if (this.resizeObserver && this.rootElement) {
      this.resizeObserver.unobserve(this.rootElement);
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }
}

export default ResponsiveScale;
