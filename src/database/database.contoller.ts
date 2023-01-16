import { v4 as uuidv4 } from 'uuid';
import { validateBody } from '../validators/request.validator.js';

const createId = (usersId: string[]) => {
  let userId = uuidv4();
  while (usersId.includes(userId)) {
    userId = uuidv4();
  }
  return userId;
};

export const createUser = (body: string, usersId: string[]) => {
  const userId = createId(usersId);
  const validUser = validateBody(body);
  if (validUser) {
    return { id: userId, ...validUser };
  }
  return null;
};
