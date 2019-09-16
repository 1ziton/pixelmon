import { Observable } from 'rxjs';

export interface AddrOption {
  label: string;
  value: string;
  disabled?: boolean;
  checked?: boolean;
  level?: number;
}
export interface ResultOption {
  label: string;
  value: string;
  mergeName?: string;
  level?: number;
}

/**
 * 抽象类，继承以便重写方法获取数据
 */
export abstract class AddressQueryService {
  abstract getListByCode(code?: string): Observable<any[]>;
  abstract getOptionByCode(code: string): Observable<any>;
}
