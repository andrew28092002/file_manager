import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFileStore = defineStore('file', () => {
  const leftPath = ref('c')
  const rightPath = ref('c')

  return {
    leftPath, rightPath
  }
})
