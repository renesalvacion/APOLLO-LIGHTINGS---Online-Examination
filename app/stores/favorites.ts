import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    rockets: [] as Array<{ id: string; name: string; description: string }>
  }),

  actions: {
    addRocket(rocket) {
      const exists = this.rockets.find(r => r.id === rocket.id)
      if (!exists) {
        this.rockets.push(rocket)
        this.saveToLocalStorage()
      }
    },

    removeRocket(id: string) {
      this.rockets = this.rockets.filter(r => r.id !== id)
      this.saveToLocalStorage()
    },

    clearFavorites() {
      this.rockets = []
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(this.rockets))
      }
    },

    loadFromLocalStorage() {
      if (typeof window !== 'undefined') {
        const data = localStorage.getItem('favorites')
        if (data) {
          this.rockets = JSON.parse(data)
        }
      }
    }
  }
})
