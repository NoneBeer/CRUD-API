import { Error } from '../constants/errors.js';
import { Response } from '../types/response.js';
import { User } from '../types/user.js';
import { validateId, validateBody } from '../validators/request.validator.js';
import { createUser } from './database.contoller.js';

export class InMemoryDatabase {
  private usersId: string[];

  private users: User[];

  constructor() {
    this.users = [];
    this.usersId = [];
  }

  public getAllUsers(): Response {
    const response = { code: 200, message: JSON.stringify(this.users) };
    return response;
  }

  public getUser(userId: string): Response {
    const isIdValid = validateId(userId);
    const userIndex = this.users.findIndex((user) => user.id === userId);
    let response: Response;

    if (!isIdValid) {
      response = { code: 400, message: Error.notValidId };
    } else if (userIndex === -1) {
      response = { code: 404, message: Error.notFound };
    } else {
      response = { code: 200, message: JSON.stringify(this.users[userIndex]) };
    }
    return response;
  }

  public addUser(body: string): Response {
    let response: Response;
    const user = createUser(body, this.usersId);
    if (user) {
      this.users.push(user);
      this.usersId.push(user.id);
      response = { code: 201, message: JSON.stringify(user) };
    } else {
      response = { code: 400, message: Error.request };
    }
    return response;
  }

  public updateUser(userId: string, body: string): Response {
    let response: Response;
    const isIdValid = validateId(userId);
    const isBodyValid = validateBody(body);
    const userIndex = this.users.findIndex((user) => user.id === userId);

    if (!isIdValid) {
      response = { code: 400, message: Error.notValidId };
    } else if (userIndex === -1) {
      response = { code: 404, message: Error.notFound };
    } else if (isBodyValid) {
      const updateUser = { id: userId, ...JSON.parse(body) };
      this.users = this.users
        .slice(0, userIndex)
        .concat(updateUser)
        .concat(this.users.slice(userIndex + 1));
      response = { code: 200, message: JSON.stringify(updateUser) };
    } else {
      response = { code: 400, message: Error.request };
    }
    return response;
  }

  public deleteUser(userId: string): Response {
    let response: Response;
    const isIdValid = validateId(userId);
    const userIndex = this.users.findIndex((user) => user.id === userId);

    if (!isIdValid) {
      response = { code: 400, message: Error.notValidId };
    } else if (userIndex === -1) {
      response = { code: 404, message: Error.notFound };
    } else {
      this.users.splice(userIndex, 1);
      response = { code: 204, message: '' };
    }
    return response;
  }
}
