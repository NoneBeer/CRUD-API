import { IncomingMessage, ServerResponse } from 'http';
import { Methods } from '../constants/methods.js';
import { InMemoryDatabase } from '../database/database.js';
import { Response } from '../types/response.js';

const database = new InMemoryDatabase();

export const routing = async (req: IncomingMessage, res: ServerResponse) => {
  const [api, users, id] = req.url!.split('/').filter(Boolean);

  // REFACTOR
  const buffer = [];
  let response: Response;

  for await (const chunk of req) {
    buffer.push(chunk);
  }
  const body = Buffer.concat(buffer).toString();

  if (`${api}/${users}` === 'api/users') {
    try {
      switch (req.method) {
        case Methods.get: {
          response = id ? database.getUser(id) : database.getAllUsers();
          break;
        }
        case Methods.post: {
          response = database.addUser(body);
          break;
        }
        case Methods.put: {
          response = database.updateUser(id, body);
          break;
        }
        case Methods.delete: {
          response = database.deleteUser(id);
          break;
        }
        default: {
          // Refactor
          response = { code: 500, message: 'Server error' };
          // throw new Error('Error method');
        }
      }
    } catch (err) {
      // REFACTOR
      response = { code: 500, message: 'Server error' };
    }
  } else {
    // REFACTOR
    response = { code: 404, message: 'Error not found' };
  }

  res.setHeader('Content-Type', 'application/json');
  res.writeHead(response.code);
  res.end(response.message);
};
