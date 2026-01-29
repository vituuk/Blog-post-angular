import { Pipe, PipeTransform } from '@angular/core';
import { LanguageEnum } from '../types/enums/language.enum';

@Pipe({
  name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
  transform(user: any, lang: LanguageEnum): unknown {
    if (user) {
      let names = [];
      if (lang == LanguageEnum.EN) {
        // verify exist becuase name en is optional
        if (user.last_name_en && user.first_name_en) {
          names.push(user.last_name_en, user.first_name_en);
          return names.join(' ');
        }
      }
      names.push(user.last_name_kh, user.first_name_kh);
      return names.join(' ');
    }
    return '';
  }
}
