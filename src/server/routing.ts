import { IncomingMessage, METHODS, ServerResponse } from "http";
import { Methods } from "../constants/methods.js";
import { InMemoryDatabase } from "../database/database.js";


const database = new InMemoryDatabase();

export const routing = async (req: IncomingMessage, res: ServerResponse) => {

  const [api, users, id] = req.url!.split('/').filter(Boolean);

  //REFACTOR
  const buffer = [];
  let result: unknown;
  let statusCode = 200;

  for await (const chunk of req) {
    buffer.push(chunk)
  }
  const body = Buffer.concat(buffer).toString();

  if (`${api}/${users}` === 'api/users') {
    try {
      switch (req.method) {
        case Methods.get: {
          result = id ? database.getUser(id) : database.getAllUsers();
          break;
        }
        case Methods.post: {
          result = database.addUser(body);
          break;
        }
        case Methods.put: {
          result = database.updateUser(id, body);
          break
        }
        case Methods.delete: {
          result = database.deleteUser(id);
          break
        }
        default: {
          throw new Error('Error method');
        }
      }
    } catch (err) {

      //REFACTOR
      statusCode = 500;
    }
  } else {
    //REFACTOR
    statusCode = 404;
    result = { code: statusCode, message: 'Error not found' }
  }

  res.setHeader('Content-Type', 'application/json')
  res.writeHead(statusCode);
  res.end(JSON.stringify(result))
}