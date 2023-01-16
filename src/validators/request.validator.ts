export const validateBody = (body: string) => {
  const requiredParams = ['username', 'age', 'hobbies'];
  const user = JSON.parse(body);

  const hasRequiredFields = requiredParams.every((param) => param in user);
  const hasValidFields = !hasRequiredFields
    ? false
    : (typeof user.username === 'string'
      && Boolean(user.username)
      && typeof user.age === 'number'
      && Boolean(user.age)
      && Array.isArray(user.hobbies));

  return hasRequiredFields && hasValidFields
    ? user
    : null;
};

export const validateId = (str: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};
