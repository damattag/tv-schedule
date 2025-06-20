import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defaultExclude, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    setupFiles: ['./test/setup-e2e.ts'],
    exclude: [
      ...defaultExclude,
      '**/index.ts',
      '**/config.ts',
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
