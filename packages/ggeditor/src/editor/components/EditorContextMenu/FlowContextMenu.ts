/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2019-08-14 15:47:15
 * 流程图右键菜单
 */

import { NodeMenu, EdgeMenu, GroupMenu, MultiMenu, CanvasMenu, ContextMenu } from 'gg-editor';
import gmenu from './MenuItem';
import * as React from 'react';

const FlowContextMenu = () => {
    const NodeMenuEl = React.createElement(NodeMenu, null, [gmenu({ command: "copy" }), gmenu({ command: "delete" })])
    const EdgeMenuEl = React.createElement(EdgeMenu, null, gmenu({ command: "delete" }))
    const GroupMenuEl = React.createElement(GroupMenu, null, [gmenu({ command: "copy" }), gmenu({ command: "delete" }), gmenu({ command: "unGroup", text: "Ungroup", icon: "ungroup" })])
    const MultiMenuEl = React.createElement(MultiMenu, null, [gmenu({ command: "copy" }), gmenu({ command: "paste" }), gmenu({ command: "delete" }), gmenu({ command: "unGroup", text: "Ungroup", icon: "ungroup" })])
    const CanvasMenuEl = React.createElement(CanvasMenu, null, [gmenu({ command: "undo" }), gmenu({ command: "redo" }), gmenu({ command: "pasteHere", text: "Paste Here", icon: "paste" })])
    return React.createElement(ContextMenu, { className: 'context-menu' }, [NodeMenuEl, EdgeMenuEl, GroupMenuEl, MultiMenuEl, CanvasMenuEl]);
}


export default FlowContextMenu;
