import { Observable } from 'rxjs';

export interface POption {
  label: string;
  value: string;
  disabled?: boolean;
  checked?: boolean;
  level?: number;
}

/**
 * 必须集成
 */
export abstract class AddressQueryService {
  abstract getAreasByCode(code?: string): Observable<any[]>;
  abstract getAreaLabelByCode(code: string): Observable<any>;
}
