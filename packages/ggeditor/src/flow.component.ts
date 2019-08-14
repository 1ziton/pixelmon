/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2019-08-14 15:47:15
 * @description: 流程图
 */

import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import GGEditor, { Flow } from 'gg-editor';
import * as invariant from 'invariant';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import { FlowProps, FlowStyle } from './interface';



@Component({
    selector: 'ggeditor-flow',
    template: `
    <div [id]="rootDomID" class="ggeditor-flow-container"></div>
	`,
})
export class FlowEditorComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
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

    //<GGEditor>
    //   <Flow style={{ width: 500, height: 500 }} data={data} />
    // </GGEditor>

    protected render() {
        if (this.isMounted()) {
            console.log(this.rootDomID)
            const flow = React.createElement(Flow, { data: this.getProps(), style: { ...this.style } });
            ReactDOM.render(React.createElement(GGEditor, {}, flow), this.getRootDomNode());
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

    ngAfterContentInit() {
        // e.on('message', message => {
        //   this.message = message.text
        //   this.changeDetector.detectChanges()
        //   this.returnMessageToReactWhenReceived()
        // })
    }

    returnMessageToReactWhenReceived() {
        // e.emit('received', { text: 'Woohoo! Hello from Angular! 🎉' })
    }
}
