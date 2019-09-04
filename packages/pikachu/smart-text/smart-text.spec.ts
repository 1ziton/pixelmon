import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SmartTextModule } from './smart-text.module';

describe('pikachu: smart-text', () => {
  let fixture: ComponentFixture<TestComponent>;
  let dl: DebugElement;
  let context: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SmartTextModule],
      declarations: [TestComponent],
    });
  });

  function create() {
    fixture = TestBed.createComponent(TestComponent);
    dl = fixture.debugElement;
    context = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('Test when text length < maxlength', () => {
    create();
    const text1 = dl.query(By.css('.text1'));
    const textContent = text1.nativeElement.querySelector('span').textContent;
    expect(context.text1).toEqual(textContent);
  });

  it('maxLength should be working', () => {
    create();
    context.maxLength = 11;
    fixture.detectChanges();
    const textContent = dl.query(By.css('.text2')).nativeElement.querySelector('span').textContent;
    expect('富强、民主、文明、和谐...').toEqual(textContent);
  });

  it('tail should be working', () => {
    create();
    context.tail = '￥￥';
    fixture.detectChanges();
    const textContent = dl.query(By.css('.tail')).nativeElement.querySelector('span').textContent;
    expect('富强、民主、文明、和谐；自由、平等、公正￥￥').toEqual(textContent);
  });
  it('undefined/null should be working', () => {
    create();
    fixture.detectChanges();
    const textContent = dl.query(By.css('.text5')).nativeElement.querySelector('span').textContent;
    expect(textContent).toEqual('');
    const textContent2 = dl.query(By.css('.text4')).nativeElement.querySelector('span').textContent;
    expect(textContent2).toEqual('');
  });

});

@Component({
  template: `
    <p>
      <smart-text [text]="text1" class="text1"></smart-text>
    </p>
    <p>
      <smart-text [text]="text2"></smart-text>
    </p>
    <p>
      <smart-text [text]="text2" [tail]="tail" class="tail"></smart-text>
    </p>
    <p>
      <smart-text [text]="text2" [maxLength]="maxLength" class="text2"></smart-text>
    </p>
    <p>
      <smart-text [text]="text3"></smart-text>
    </p>
    <p>
      <smart-text [text]="text4" class="text4"></smart-text>
    </p>
    <p>
      <smart-text [text]="text5" class="text5"></smart-text>
    </p>
  `,
})
export class TestComponent implements OnInit {
  maxLength = 20;
  tail = '??';
  text1 = '我的愿望是世界和平！';
  text2 = '富强、民主、文明、和谐；自由、平等、公正、法治；爱国、敬业、诚信、友善。';
  text3 = '';
  text4 = null;
  text5 = undefined;
  ngOnInit() {
    setTimeout(() => {
      this.text3 = this.text2;
    }, 2000);
  }
}
