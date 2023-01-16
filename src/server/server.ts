import http from 'http';
import dotenv from 'dotenv';
import { routing } from './routing.js';

dotenv.config();

const PORT = process.env.PORT || 4001;

export const startServer = () => {
  http.createServer(routing)
    .listen(PORT, () => console.log(`Server started on port: ${PORT}`));
};
