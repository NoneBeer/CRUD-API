import { User } from "../types/user.js";
import { validate } from "../validators/request.validator.js";

export class InMemoryDatabase {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public getAllUsers(): User[] {
    return this.users;
  }

  public getUser(userId: string): User {
    const userIndex = this.users.findIndex(user => user.id === userId);
    if (!userIndex) {
      throw new Error("User not found");
    }
    return this.users[userIndex];
  }

  public addUser(body: string): void {
    const user = validate(body);
    if (user) {
      this.users.push(user);
    } else {
      throw new Error("BODY is not valid")
    }
  }

  public updateUser(userId: string, body: string): void {
    const userIndex = this.users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    const isBodyValid = validate(body);
    if (isBodyValid) {
      const updatedUser = JSON.parse(body);
      if (updatedUser.name) {
        this.users[userIndex].username = updatedUser.name;
      }
      if (updatedUser.age) {
        this.users[userIndex].age = updatedUser.age;
      }
      if (updatedUser.hobbies) {
        this.users[userIndex].hobbies = updatedUser.hobbies;
      }
    } else {
      throw new Error("BODY is not valid");
    }

  }

  public deleteUser(userId: string): void {
    const userIndex = this.users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    this.users.splice(userIndex, 1);
  }
}