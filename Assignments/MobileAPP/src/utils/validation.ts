export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateFullName = (name: string) => {
  return name.trim().split(/\s+/).length >= 2;
};

export const validateUsername = (username: string) => {
  return username.length >= 4;
};

export const validatePassword = (password: string) => {
  return password.length >= 8;
};
