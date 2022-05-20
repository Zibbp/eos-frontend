import { defineStore } from 'pinia'

export const useVideoStore = defineStore({
    id: 'video-store',
    state: () => {
        return {
            displayRandomVideos: true
        }
    },
    actions: {
        toggleRandomVideos() {
            this.displayRandomVideos = !this.displayRandomVideos
        }
    },
    getters: {
    }
})