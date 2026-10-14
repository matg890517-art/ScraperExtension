import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    actions: {},
    permissions: [
      'storage',
      'tabs',
      'sidePanel',
      'scripting',
    ],
    host_permissions: ['<all_urls>'],
  },
});