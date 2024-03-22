import { VALID_EMAIL_REGEX } from "./constants";

export const checkIsEmailValid = (email: string) => {
  if (!email) return false;

  const emailParts = email?.split("@");

  if (emailParts.length !== 2) return false;

  const account = emailParts[0];
  const address = emailParts[1];

  if (account.length > 64) return false;

  if (address.length > 255) return false;

  const domainParts = address.split(".");
  if (domainParts.some((part) => part.length > 63)) return false;

  if (!VALID_EMAIL_REGEX.test(email)) return false;

  return true;
};
