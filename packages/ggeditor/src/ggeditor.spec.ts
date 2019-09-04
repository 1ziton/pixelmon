import { Component, DebugElement, OnDestroy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PixelmonGGEditorModule } from './ggeditor.module';
import { FlowProps, MindProps } from './interface';

describe('ggeditor', () => {
  let fixture: ComponentFixture<TestComponent>;
  let dl: DebugElement;
  let context: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PixelmonGGEditorModule],
      declarations: [TestComponent],
    });
  });

  function create() {
    fixture = TestBed.createComponent(TestComponent);
    dl = fixture.debugElement;
    context = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('Test flow', () => {
    create();
    // fixture.detectChanges();
    const graph = dl.query(By.css('.ggeditor-flowpage')).nativeElement;
    // console.log(graph);
    const canvasH = graph.querySelector('canvas').height;
    expect(canvasH).not.toBeFalsy();
  });

  it('Test mind', () => {
    create();
    context.data = {
      roots: [
        {
          label: '中心主题',
          children: [
            {
              label: '分支主题 1',
            },
            {
              label: '分支主题 2',
            },
            {
              label: '分支主题 3',
              children: [
                {
                  label: '分支主题 3-1',
                },
              ],
            },
          ],
        },
      ],
    };
    context.type = 'mind';
    fixture.detectChanges();
    const graph = dl.query(By.css('.ggeditor-flowpage')).nativeElement;
    const canvasH = graph.querySelector('canvas').height;
    expect(canvasH).not.toBeFalsy();
  });

  it('Test Editor render', () => {
    create();
    context.enableEditor = true;
    fixture.detectChanges();
    const graph = dl.query(By.css('.ggeditor-flowpage')).nativeElement;
    // console.log(graph);
    const toolbar = graph.querySelector('.toolbar').childNodes;
    expect(toolbar.length).toBeGreaterThan(6);
    const sidebar = graph.querySelector('.editorSidebar');
    expect(sidebar).not.toBeFalsy();
    const minimapContainer = graph.querySelector('.g6-editor-minimap-container');
    expect(minimapContainer).not.toBeFalsy();
    const editorContent = graph.querySelector('.editorContent');
    expect(editorContent).not.toBeFalsy();
    expect(editorContent.querySelector('canvas')).not.toBeFalsy();
  });
});

@Component({
  selector: 'floweditor-demo',
  template: `
    <p-ggeditor
      [type]="type"
      [enableEditor]="enableEditor"
      [data]="data"
      [style]="{ width: 900, height: 600 }"
      style="height:600px;display:block"
    ></p-ggeditor>
  `,
})
export class TestComponent implements OnDestroy {
  type = 'flow';
  enableEditor = false;
  data: MindProps | FlowProps = {
    nodes: [
      {
        type: 'node',
        size: '70*70',
        shape: 'flow-circle',
        color: '#FA8C16',
        label: '起止节点',
        x: 55,
        y: 55,
        id: 'ea1184e8',
        index: 0,
      },
      {
        type: 'node',
        size: '70*70',
        shape: 'flow-circle',
        color: '#FA8C16',
        label: '结束节点',
        x: 55,
        y: 255,
        id: '481fbb1a',
        index: 2,
      },
    ],
    edges: [
      {
        source: 'ea1184e8',
        sourceAnchor: 2,
        target: '481fbb1a',
        targetAnchor: 0,
        id: '7989ac70',
        index: 1,
      },
    ],
  };

  constructor() {}

  ngOnDestroy() {}
}
