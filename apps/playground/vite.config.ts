import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        if (
          warning.code === 'EVAL' &&
          typeof warning.id === 'string' &&
          warning.id.includes('/3dmol/')
        ) {
          return;
        }

        defaultHandler(warning);
      },
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules') && !id.includes('/packages/')) {
            return undefined;
          }

          if (id.includes('/react/') || id.includes('/react-dom/')) {
            return 'vendor-react';
          }
          if (id.includes('/3dmol/')) {
            return 'vendor-3dmol';
          }
          if (id.includes('/xterm/') || id.includes('/@xterm/')) {
            return 'vendor-xterm';
          }
          if (id.includes('/@xyflow/')) {
            return 'vendor-xyflow';
          }
          if (
            id.includes('/react-markdown/') ||
            id.includes('/remark-') ||
            id.includes('/rehype-') ||
            id.includes('/micromark') ||
            id.includes('/mdast-') ||
            id.includes('/hast-') ||
            id.includes('/unist-')
          ) {
            return 'vendor-markdown';
          }
          if (id.includes('/lucide-react/')) {
            return 'vendor-icons';
          }
          if (id.includes('/@remote-codex/thread-ui/dist/workspace-panel')) {
            return 'thread-ui-workspace';
          }
          if (id.includes('/@remote-codex/thread-ui/dist/')) {
            return 'thread-ui-core';
          }
          if (id.includes('/@remote-codex/plugin-xyz-viewer/')) {
            return 'plugin-xyz-viewer';
          }
          if (id.includes('/@remote-codex/plugin-')) {
            return 'plugin-runtime';
          }

          return undefined;
        },
      },
    },
  },
  server: {
    port: 5174,
  },
});
