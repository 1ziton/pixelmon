import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddressQueryService } from '@pixelmon/pikachu/address-select/interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AreaService extends AddressQueryService {
  constructor(private http: HttpClient) {
    super();
  }

  getListByCode(code: string): Observable<any[]> {
    if (!code) {
      code = code = '000000000000';
    }
    return this.http
      .post(
        `https://domain.1ziton.com/api/baseConfig/findAreaList
      `,
        [{ parentCode: code }],
      )
      .pipe(map((res: any) => res.content))
      .pipe(
        map((list: any) => {
          return list.map((item: any) => ({
            label: `${item.name}`,
            value: `${item.code}`,
            level: item.level,
          }));
        }),
      );
  }
  getOptionByCode(code: string): Observable<any> {
    return this.http.post(`https://domain.1ziton.com/api/baseConfig/getAreaByCode`, [{ code }]).pipe(map((res: any) => res.content));
  }
}
