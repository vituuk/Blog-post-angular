import {Injector} from '@angular/core';
import {HttpClientService} from './http-client.service';
import {BaseDataTable} from '../types/base-data-table';
import {BaseData} from '../types/base-data';
import {RequestOption} from '../types/request-option';

export class BaseCrudService<T> {
  protected path: string = '';
  protected httpClientService: HttpClientService;

  constructor(injector: Injector) {
    this.httpClientService = injector.get(HttpClientService);
  }

  getMany<ET = {}>(
    data?: {
      q?: string;
      page?: number;
      limit?: number;
      populate?: string;
      select?: string;
      sort?: string;
      [key: string]: any;
    },
    options?: RequestOption,
  ) {
    data =
      data &&
      Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== ''));
    return this.httpClientService.getJSON<BaseDataTable<T & ET>>(this.path, {
      data,
      isAlertError: options?.isAlertError ?? true,
      isLoading: options?.isLoading ?? true
    });
  }

  getOne(
    data?: {
      populate?: string;
      sort?: string;
      select?: string;
      [key: string]: any;
    },
    options?: RequestOption,
  ) {
    return this.httpClientService.getJSON<BaseData<T>>(this.path, {
      data,
      isAlertError: options?.isAlertError ?? true,
      isLoading: options?.isLoading ?? true,
    });
  }

  getById(
    _id: string,
    data?: {
      populate?: string;
      select?: string;
      [key: string]: any;
    },
    options?: RequestOption,
  ) {
    return this.httpClientService.getJSON<BaseData<T>>(
      this.path + '/find/' + _id,
      {
        data,
        isAlertError: options?.isAlertError ?? true,
        isLoading: options?.isLoading ?? true,
      },
    );
  }

  create(data: T, options?: RequestOption) {
    return this.httpClientService.postJSON<BaseData<T>>(
      this.path,
      {
        data,
        isAlertError: options?.isAlertError ?? true,
        isLoading: options?.isLoading ?? true
      },
    );
  }

  delete(options?: RequestOption) {
    return this.httpClientService.deleteJSON<BaseData<T>>(
      this.path,
      {
        isAlertError: options?.isAlertError ?? true,
        isLoading: options?.isLoading ?? true
      },
    );
  }
}
