import { User } from "../types/user.js";

export const validate = (body: string) => {

  const parsedBody = JSON.parse(body);
  let user: User;

  try {
    user = parsedBody;
  } catch {
    throw new Error('Uncorrect body')
  }

  return user;
}