import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import 'dotenv/config';
import express from 'src/express';
import morgan from 'morgan';

import { errorHandler } from './middleware/errorHandler';

const server = express();
const PORT = process.env.PORT || 5000;

//Middlewares
server.use(cors());
server.use(morgan('dev'));
server.use(express.json({ limit: '10mb' }));
server.use(clerkMiddleware());

//Routes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const routesPath = path.join(__dirname, 'routes');
const loadRoutes = async () => {
  const files = readdirSync(routesPath).filter((f) => f.endsWith('.ts') || f.endsWith('.js'));

  await Promise.all(
    files.map(async (file) => {
      const route = await import(pathToFileURL(path.join(routesPath, file)).href);
      const routeName = file.replace(/\.(ts|js)$/, '');
      server.use(`/api/${routeName}`, route.default || route);
    }),
  );
};

const startServer = async () => {
  await loadRoutes();

  server.use(errorHandler);

  server.listen(PORT, () => {
    console.log(`🚀  Server is running at http://localhost:${PORT}`);
  });
};

startServer();
