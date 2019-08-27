import { Observable } from 'rxjs';

export interface BosConfig {
  endpoint: string; // BOS服务器的地址
  ak: string; // STS服务器下发的临时ak
  sk: string; // STS服务器下发的临时sk
  sessionToken: string; // STS服务器下发的sessionToken
}

export abstract class UploadServiceToken {
  abstract bosConfig: BosConfig; // 百度bos上传的设置参数
  abstract workerUrl: string; // Worker的地址
  abstract getConfig(): Observable<BosConfig>; // 获取token的逻辑
}
