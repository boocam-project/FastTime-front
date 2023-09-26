export const USERNAME_PATTERN = /^(?!.*[ㄱ-ㅎㅏ-ㅣ])[a-z0-9ㄱ-힇]+$/;
export const PASSWORD_PATTERN =
  /^(?=(?:[^a-zA-Z]*[a-zA-Z]))(?=(?:\D*\d))(?=(?:[a-zA-Z0-9]*[~!-_@#]))[a-zA-Z0-9~!-_]+$/;

export const PATTERNS = {
  username: USERNAME_PATTERN,
  password: PASSWORD_PATTERN,
};
