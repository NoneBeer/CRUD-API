import http from 'http';
import { routing } from './routing.js';

const PORT = 8000;

export const startServer = () => {
    http.createServer(routing)
        .listen(PORT, () =>
            console.log(`Server started on port: ${PORT}`));
}