
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, './.env') });

import app from './app';
import { config } from './config/environment';
import { connectDB } from './config/db';

connectDB();

const server = app.listen(config.server.port, () => {
  console.log(`Server running in ${config.server.env} mode on port ${config.server.port}`);
});

process.on('unhandledRejection', (err: any) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});