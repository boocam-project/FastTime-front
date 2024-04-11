export const USERNAME_PATTERN = /^(?!.[ㄱ-ㅎㅏ-ㅣ])[a-z0-9ㄱ-힇]+$/;
export const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

export const PATTERNS = {
  username: USERNAME_PATTERN,
  password: PASSWORD_PATTERN,
  email: EMAIL_PATTERN,
};

export const ARTICLES_KEY = ['articles'];
export const COMMENTS_KEY = ['comments'];
export const LIKE_KEY = ['like'];
