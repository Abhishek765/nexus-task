export const VALID_EMAIL_REGEX = RegExp(
  // eslint-disable-next-line
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
);

export const localStorageKeys = {
  AUTH_TOKEN: "AUTH_TOKEN",
  USER_DATA: "USER_DATA",
};
