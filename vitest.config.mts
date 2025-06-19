import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defaultExclude, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    exclude: [
      ...defaultExclude,
      '**/index.ts',
      '**/config.ts',
      '**/test/*',
      '**/*.module.ts',
      '**/*.d.ts',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        ...defaultExclude,
        '**/index.ts',
        '**/config.ts',
        '**/test/*',
        '**/*.module.ts',
        '**/*.d.ts',
      ],
    },
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
