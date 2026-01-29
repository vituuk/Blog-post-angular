import { MessageCodeEnum } from './enums/message-code.enum';
import { IErrorValidation } from './error-validation';

export interface BadRequestResponse {
  msg: string;
  msgCode: MessageCodeEnum;
  errors?: IErrorValidation[];
}
