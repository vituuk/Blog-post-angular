import { MessageCodeEnum } from '../types/enums/message-code.enum';

const Message: {
  [Property in MessageCodeEnum]: string;
} = {
  [MessageCodeEnum.required]: 'm.required',
  [MessageCodeEnum.token_invalid]: 'm.token_invalid',
  [MessageCodeEnum.login_fail]: 'm.login_fail',
  [MessageCodeEnum.unknown_error]: 'm.unknown_error',
};

export const getMessage = (code: MessageCodeEnum) => {
  return Message[code];
};
