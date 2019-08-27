/**
 * @Description: 上传组件，默认使用百度baidubce的对象存储bos上传
 * Web端直传实践：https://cloud.baidu.com/doc/BOS/s/9jwvys8y7/
 * @Author: zomixi
 * @Date: 2019-07-22 15:44:37
 */

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

import { Component, OnInit, Input, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UploadFile, UploadXHRArgs, UploadFilter } from 'ng-zorro-antd';
import { Observable, Subscription } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { uuidv1 } from '@pixelmon/util';

declare const baidubce: any;

@Component({
  selector: 'p-advancedUpload',
  templateUrl: './advanced-upload.component.html',
  styleUrls: ['./advanced-upload.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AdvancedUploadComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedUploadComponent implements OnInit, ControlValueAccessor {
  @Input() accept = 'image/png,image/jpeg,image/gif,image/bmp'; // 接受上传的文件类型, 详见https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
  @Input() action = ''; // 上传的地址
  @Input() directory = false; // 是否支持上传文件夹
  @Input() disabled = false; // 是否禁用
  @Input() limit = 9; // 限制单次最多上传数量，nzMultiple 打开时有效；0 表示不限
  @Input() size = 0; // 限制文件大小，单位：KB；0 表示不限
  @Input() fileType = 'image/png,image/jpeg,image/gif,image/bmp'; // 限制文件类型，例如：image/png,image/jpeg,image/gif,image/bmp
  @Input() listType: 'text' | 'picture' | 'picture-card' = 'picture-card'; // 上传列表的内建样式，支持三种基本样式
  @Input() multiple = true; // 是否支持多选文件，ie10+ 支持
  @Input() showButton = true; // 是否展示上传按钮
  @Input() placeholder = '上传'; // 占位提示语
  @Input() customContent: TemplateRef<any>; // 自定义content
  @Input() maxLength = Infinity; // 最多上传数

  @Input() bucket = 'bucket'; // 百度BOS上的命名空间
  @Input() fastUpload = true; // 是否使用快传

  @Input() filter: UploadFilter[] = [
    {
      name: 'maxLength',
      fn: fileList => {
        // 限制最大上传数量
        return fileList.slice(0, this.maxLength - this.fileList.length);
      },
    },
  ];

  // 是否显示预览图标
  @Input() set showPreviewIcon(value: boolean) {
    this.showUploadList = { ...this.showUploadList, showPreviewIcon: value };
  }

  // 是否显示删除图标
  @Input() set showRemoveIcon(value: boolean) {
    this.showUploadList = { ...this.showUploadList, showPreviewIcon: value };
  }

  // 是否显示预览图标和删除图标
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true, // 不是图片时隐藏预览图标
  };

  private bosClient: any = null; // 百度上传客户端
  private isSupportWorker = false; // 浏览器是否支持Worker

  isLoading = false; // 百度上传客户端初始化中
  fileList: UploadFile[] = []; // 文件列表，绑定ControlValueAccessor
  fileListChange: (files: UploadFile[]) => void; // 文件列表改变，绑定ControlValueAccessor

  // 预览modal参数对象
  previewModal = {
    visible: false, // 是否显示预览modal
    image: '', // 预览图片
  };

  // 上传文件之前的钩子,若返回 false 则停止上传。注意：务必使用 => 定义处理方法
  @Input() beforeUpload: (file: UploadFile, fileList: UploadFile[]) => boolean | Observable<boolean>;

  // 点击移除文件时的回调，返回值为 false 时不移除。注意：务必使用 => 定义处理方法。
  @Input() remove: (file: UploadFile) => boolean | Observable<boolean>;

  // 点击文件链接或预览图标时的回调；注意：务必使用 => 定义处理方法
  @Input() preview: (file: UploadFile) => void = (file: UploadFile) => {
    this.previewModal.image = file.url! || file.thumbUrl!;
    this.previewModal.visible = true;
    this._cdr.detectChanges();
  };

  // 通过覆盖默认的上传行为，可以自定义自己的上传实现；注意：务必使用 => 定义处理方法
  @Input() customRequest: (subject: UploadXHRArgs) => Subscription = uploadSubject => {
    const uploadFile = uploadSubject.file;

    // uploadKey用于标识文件唯一性，如果重复Put同一个key的Object，之前上传的数据将被覆盖
    this.getUploadKey(uploadFile).then(uploadKey => {
      // 尝试秒传
      if (this.isSupportWorker && this.fastUpload) {
        // 先用HEAD请求根据key判断是否已上传过该文件
        this.bosClient
          .getObjectMetadata(this.bucket, uploadKey)
          .then(event => {
            // 上传过了，直接回显
            uploadFile.url = `${this.bosClient.config.endpoint}/v1/${this.bucket}/${uploadKey}`;
            uploadSubject.onSuccess!('上传成功', uploadFile, event);
          })
          .catch(
            // 没有上传过，使用百度bos直传
            () => this.bosUpload(uploadSubject, this.bucket, uploadKey, uploadFile),
          );
      } else {
        // 百度bos直传
        this.bosUpload(uploadSubject, this.bucket, uploadKey, uploadFile);
      }
    });

    // ZORRO要求返回一个Subscription
    return new Subscription();
  };

  constructor(private _cdr: ChangeDetectorRef, private _uploadSrv: UploadServiceToken) {
    this.initBosClient();
  }

  ngOnInit() {
    // 判断是否支持Worker
    if (typeof Worker !== 'undefined') {
      this.isSupportWorker = true;
    } else {
      if (this.fastUpload) {
        console.error('浏览器不支持Worker，无法使用快传！');
      }
    }
  }

  writeValue(value) {
    this.fileList = value || [];
    this.fileList.forEach(file => {
      file.uid = file.uid || uuidv1();
    });
    this._cdr.detectChanges(); // for issue：https://github.com/angular/angular/issues/10816
  }

  registerOnChange(fn: any) {
    this.fileListChange = fn;
  }

  registerOnTouched() {}

  // 初始化百度上传客户端
  initBosClient() {
    if (this._uploadSrv.getConfig()) {
      this.isLoading = true;
      this._uploadSrv.getConfig()!.subscribe(config => {
        this.bosClient = new baidubce.sdk.BosClient({
          endpoint: config.endpoint,
          credentials: {
            ak: config.ak,
            sk: config.sk,
          },
          sessionToken: config.sessionToken,
        });
        this.isLoading = false;
        this._cdr.detectChanges();
      });
    }
  }

  getUploadKey(file: UploadFile): Promise<string> {
    return new Promise(resolve => {
      // 使用Worker
      if (this.isSupportWorker && this.fastUpload) {
        const worker = new Worker(this._uploadSrv.workerUrl);

        worker.onerror = error => {
          console.error('Worker异常，已关闭！', error);
          worker.terminate();
        };

        worker.postMessage(file);

        worker.onmessage = event => {
          // 使用文件md5+最后修改时间+文件大小+文件名来保证唯一性，同时相同的文件的key也会相同,用于秒传
          const key = `${event.data}${file.lastModified}${file.size}${file.name}`;
          resolve(key);
          worker.terminate();
        };
      } else {
        // 不使用Worker
        // 使用当前时间+四位随机码+最后修改时间+文件大小+文件名来保证唯一性，此时因为相同文件key也会不同，故实现不了秒传
        const random = `${new Date().getTime()}${(Math.random() * 10000).toFixed(0)}`;
        const key = `${random}${file.lastModified}${file.size}${file.name}`;
        resolve(key);
      }
    });
  }

  // 使用百度bos直传
  bosUpload(uploadSubject: UploadXHRArgs, bucket: string, uploadKey: string, uploadFile: UploadFile) {
    this.bosClient
      .putObjectFromBlob(bucket, uploadKey, uploadFile)
      .then((event: HttpResponse<{}>) => {
        uploadFile.url = `${this.bosClient.config.endpoint}/v1/${bucket}/${uploadKey}`;
        uploadSubject.onSuccess!('上传成功', uploadFile, event);
      })
      .catch((event: HttpErrorResponse) => {
        uploadSubject.onError!(event, uploadFile);
      });
  }

  onFileListChange() {
    // 去除缩略图，因为缩略图太大,要是外部不处理会影响Http请求速度
    this.fileListChange(this.fileList.map(file => ({ ...file, thumbUrl: '' })));
    this._cdr.detectChanges();
  }

  onChange() {
    // 赋值url
    this.fileList.forEach(file => {
      file.url = file.url || (file.originFileObj && (file.originFileObj as any).url);
    });
    this.onFileListChange();
  }
}
