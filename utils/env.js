function requiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  username: requiredEnv('LOGIN_USERNAME'),
  password: requiredEnv('LOGIN_PASSWORD')
};
