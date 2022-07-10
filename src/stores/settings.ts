import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    visible: false,
  }),

  actions: {
    /**
     * toggle
     */
    toggleSettings() {
      this.visible = !this.visible;
    },

    /**
     * Close
     */
    closeSettings() {
      this.visible = false;
    },

    /**
     * Open
     */
    openSettings() {
      this.visible = true;
    },
  },
});
