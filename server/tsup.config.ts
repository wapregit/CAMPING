import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'server.ts',
    'config/prisma.ts',
    'middleware/auth.ts',
    'middleware/errorHandler.ts',
    'utils/AppError.ts',
    'utils/renderError.ts',
    'controllers/camping.ts',
    'controllers/profile.ts',
    'controllers/cloudinary.ts',
    'routes/camping.ts',
    'routes/profile.ts',
    'routes/cloudinary.ts',
  ],
  splitting: false,
  sourcemap: false,
  dts: false,
  clean: true,
  format: ['esm'],
  target: 'node22',
  outDir: 'dist',
  shims: false,
  external: ['@prisma/client'],
});
