/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2019-08-14 15:47:15
 * @description: ggeditor angular component
 */

import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { InputBoolean } from '@pixelmon/util';
import GGEditor, { Flow, Mind, MindProps } from 'gg-editor';
import * as invariant_ from 'invariant';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import { FlowProps, FlowStyle, GraphType } from './interface';
import FlowPage from './editor/flow/FlowPage';

const invariant = invariant_;

@Component({
  selector: 'p-ggeditor',
  template: `
    <div [id]="rootDomID" class="ggeditor-flowpage"></div>
  `,
  styleUrls: ['./editor/styles/index.less'],
})
export class GGEditorComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() data: FlowProps;
  @Input() style: FlowStyle = {
    width: 500,
    height: 500,
  };
  @Input() type: GraphType = 'flow';
  @Input() @InputBoolean() enableEditor = false;
  @Input() onLoadingChanged?: any;
  @Input() onError?: any;

  rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): FlowProps | MindProps {
    return {
      ...this.data,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  // <GGEditor>
  //   <Flow style={{ width: 500, height: 500 }} data={data} />
  // </GGEditor>

  // <GGEditor>
  //   <Mind style={{ width: 500, height: 500 }} data={data} />
  // </GGEditor>

  protected render() {
    if (this.isMounted()) {
      //   console.log(this.rootDomID);
      if (this.type === 'flow') {
        if (this.enableEditor) {
          return this.renderFlowEditor();
        }
        return this.renderFlow();
      }
      if (this.type === 'mind') {
        return this.renderMind();
      }
    }
  }

  renderFlow() {
    const flow = React.createElement(Flow, { data: this.getProps(), style: { ...this.style } });
    ReactDOM.render(React.createElement(GGEditor, {}, flow), this.getRootDomNode());
  }

  renderFlowEditor() {
    ReactDOM.render(React.createElement(FlowPage, { data: this.getProps() }), this.getRootDomNode());
  }

  renderMind() {
    const mind = React.createElement(Mind, { data: this.getProps(), style: { ...this.style } });
    ReactDOM.render(React.createElement(GGEditor, {}, mind), this.getRootDomNode());
  }

  ngOnInit() {
    this.rootDomID = uuid.v1();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {}
}
