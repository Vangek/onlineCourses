import { defineStore } from 'pinia'

export const useSectionStore = defineStore('section', {
  state: () => ({
    currentSection: 0,
    isSectionLocked: false
  }),
  actions: {
    setCurrentSection(section: number) {
      if (this.isSectionLocked) {
        return
      }
      this.currentSection = section
    },
    resetSection() {
      this.currentSection = 0
    },
    nextSection(maxSection: number) {
      if (this.currentSection < maxSection) {
        this.currentSection++
      }
    },
    prevSection() {
      if (this.currentSection > 0) {
        this.currentSection--
      }
    },
    lockSection(lock: boolean) {
      this.isSectionLocked = lock
    },
    handleScroll(direction: string, maxSection: number) {
      if (this.isSectionLocked) {
        return
      }
      
      if (direction === 'next') {
        this.nextSection(maxSection)
      } else if (direction === 'prev') {
        this.prevSection()
      }
    }
  }
}) 