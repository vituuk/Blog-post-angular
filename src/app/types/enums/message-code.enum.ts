export const MessageCodeEnum = {
  required: 1,
  token_invalid: 2,
  login_fail: 3,
  unknown_error: 4,
} as const;
export type MessageCodeEnum = typeof MessageCodeEnum[keyof typeof MessageCodeEnum];