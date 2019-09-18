import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from '@pixelmon/cache';
import { AddressQueryService } from '@pixelmon/pikachu/address-select/interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AreaService extends AddressQueryService {
  constructor(private http: HttpClient, private cacheSrv: CacheService) {
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
          const cacheResult: Array<any> = this.cacheSrv.getNone(`/data/area-${code}`) || [];
          if (cacheResult.length > 0) {
            return cacheResult;
          }
          const result = list.map((item: any) => ({
            label: `${item.name}`,
            value: `${item.code}`,
            level: item.level,
          }));
          if (result.length > 0) {
            this.cacheSrv.set(`/data/area-${code}`, result);
          }
          return result;
        }),
      );
  }
  getOptionByCode(code: string): Observable<any> {
    return this.http.post(`https://domain.1ziton.com/api/baseConfig/getAreaByCode`, [{ code }]).pipe(map((res: any) => res.content));
  }
}
