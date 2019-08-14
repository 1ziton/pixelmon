/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2019-08-14 15:47:15
 * @description: 思维导图
 */

import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import GGEditor, { Mind } from 'gg-editor';
import * as invariant from 'invariant';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import { MindProps, FlowStyle } from './interface';


@Component({
    selector: 'ggeditor-mind',
    template: `
    <div [id]="rootDomID" class="ggeditor-mind-container"></div>
	`,
})
export class MindEditorComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
    @Input() data: MindProps;
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

    protected getProps(): MindProps {
        const {
            roots,
        } = this.data;
        return {
            roots,
        };
    }

    private isMounted(): boolean {
        return !!this.rootDomID;
    }

    //<GGEditor>
    //   <Mind style={{ width: 500, height: 500 }} data={data} />
    //</GGEditor>

    protected render() {
        if (this.isMounted()) {
            const mind = React.createElement(Mind, { data: this.getProps(), style: { ...this.style } });
            ReactDOM.render(React.createElement(GGEditor, {}, mind), this.getRootDomNode());
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
