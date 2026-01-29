import { FormGroup } from '@angular/forms';
import { getMessage } from './message.util';
import { MessageCodeEnum } from '../types/enums/message-code.enum';
import { BadRequestResponse } from '../types/bad-request-response';

export const formRequestErrorHandler = (form: FormGroup) => {
  return (err: string | BadRequestResponse) => {
    if (typeof err !== 'string') {
      let errors = err.errors;
      if (errors?.length) {
        errors.forEach((e) => {
          form.get(e.field)?.setErrors({
            message:
              getMessage(parseInt(e.msgCode) as MessageCodeEnum) || e.msgCode,
          });
        });
        form.markAllAsTouched();
      }
    }
  };
};
