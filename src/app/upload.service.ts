import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadServiceToken, BosConfig } from '@pixelmon/pikachu/upload/upload-interface';

@Injectable({
  providedIn: 'root',
})
export class UploadService extends UploadServiceToken {
  workerUrl = '/assets/js/getFileMd5.js';
  bosConfig: BosConfig;

  constructor() {
    super();
  }

  getConfig(): Observable<BosConfig> {
    return new Observable<BosConfig>(observer => {
      this.getBosConfig().then(config => {
        observer.next(config);
        observer.complete();
      });
    });
  }

  getBosConfig(): Promise<BosConfig> {
    return new Promise(resolve => {
      if (this.bosConfig) {
        resolve(this.bosConfig);
      } else {
        setTimeout(() => {
          this.bosConfig = {
            endpoint: 'https://yztfile.gz.bcebos.com',
            ak: 'd1f34f5cac2211e9ba0643cb6446d1e6',
            sk: 'ce5c4d711a17438ca5d6f891b4d3d907',
            sessionToken: '',
          };
          resolve(this.bosConfig);
        });
      }
    });
  }
}
