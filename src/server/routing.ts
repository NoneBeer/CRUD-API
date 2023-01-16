import { IncomingMessage, ServerResponse } from 'http';
import { baseURL, headerName, headerValue } from '../constants/constants.js';
import { error } from '../constants/errors.js';
import { Methods } from '../constants/methods.js';
import { InMemoryDatabase } from '../database/database.js';
import { Response } from '../types/response.js';

const database = new InMemoryDatabase();

export const routing = async (req: IncomingMessage, res: ServerResponse) => {
  const [api, users, id, ...rest] = req.url!.split('/').filter(Boolean);
  const buffer = [];
  let response: Response;

  for await (const chunk of req) {
    buffer.push(chunk);
  }
  const body = Buffer.concat(buffer).toString();

  if (`${api}/${users}` === baseURL && !rest.length) {
    try {
      switch (req.method) {
        case Methods.get: {
          response = id ? database.getUser(id) : database.getAllUsers();
          break;
        }
        case Methods.post: {
          response = id ? { code: 400, message: error.request } : database.addUser(body);
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
          response = { code: 200, message: error.operation };
        }
      }
    } catch (err) {
      response = { code: 500, message: error.server };
    }
  } else {
    response = { code: 404, message: error.notFound };
  }

  res.setHeader(headerName, headerValue);
  res.writeHead(response.code);
  res.end(response.message);
};
