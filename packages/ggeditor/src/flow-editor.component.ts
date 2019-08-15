/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2019-08-14 15:47:15
 * @description: 流程图
 */

import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import * as invariant_ from 'invariant';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import FlowPage from './editor/flow/FlowPage';
import { FlowProps, FlowStyle } from './interface';

const invariant = invariant_;


@Component({
    selector: 'ggeditor-flowpage',
    template: `
    <div [id]="rootDomID" class="ggeditor-flowpage"></div>
    `,
    styleUrls: [
        './editor/styles/index.less'
    ]
})
export class FlowPageEditorComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
    @Input() data: FlowProps;
    @Input() style: FlowStyle = {
        width: 500, height: 500
    };
    @Input() onLoadingChanged?: (any);
    @Input() onError?: (any);

    rootDomID: string;

    // constructor(@Inject(ChangeDetectorRef) private changeDetector: ChangeDetectorRef) {}

    protected getRootDomNode() {
        const node = document.getElementById(this.rootDomID);
        invariant(node, `Node '${this.rootDomID} not found!`);
        return node;
    }

    protected getProps(): FlowProps {
        const {
            nodes,
            edges
        } = this.data;
        return {
            nodes,
            edges
        };
    }

    private isMounted(): boolean {
        return !!this.rootDomID;
    }

    // <GGEditor>
    //   <Flow style={{ width: 500, height: 500 }} data={data} />
    // </GGEditor>

    protected render() {
        if (this.isMounted()) {
            ReactDOM.render(React.createElement(FlowPage, { data: this.getProps() }), this.getRootDomNode());
        }
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


    ngOnDestroy() {
    }

}
