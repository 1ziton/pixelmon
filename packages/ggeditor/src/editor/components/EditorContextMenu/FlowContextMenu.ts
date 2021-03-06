/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2019-08-14 15:47:15
 * 流程图右键菜单
 */

import { NodeMenu, EdgeMenu, GroupMenu, MultiMenu, CanvasMenu, ContextMenu } from 'gg-editor';
import gmenu from './MenuItem';
import * as React from 'react';

const FlowContextMenu = () => {
  const NodeMenuEl = React.createElement(NodeMenu, { key: 'nodemenu' }, [gmenu({ command: 'copy' }), gmenu({ command: 'delete' })]);
  const EdgeMenuEl = React.createElement(EdgeMenu, { key: 'edgemenu' }, gmenu({ command: 'delete' }));
  const GroupMenuEl = React.createElement(GroupMenu, { key: 'groupmenu' }, [
    gmenu({ command: 'copy' }),
    gmenu({ command: 'delete' }),
    gmenu({ command: 'unGroup', text: 'Ungroup', icon: 'ungroup' }),
  ]);
  const MultiMenuEl = React.createElement(MultiMenu, { key: 'multimenu' }, [
    gmenu({ command: 'copy' }),
    gmenu({ command: 'paste' }),
    gmenu({ command: 'delete' }),
    gmenu({ command: 'unGroup', text: 'Ungroup', icon: 'ungroup' }),
  ]);
  const CanvasMenuEl = React.createElement(CanvasMenu, { key: 'canvasmenu' }, [
    gmenu({ command: 'undo' }),
    gmenu({ command: 'redo' }),
    gmenu({ command: 'pasteHere', text: 'Paste Here', icon: 'paste' }),
  ]);
  return React.createElement(ContextMenu, { className: 'context-menu', key: 'context-menu' }, [
    NodeMenuEl,
    EdgeMenuEl,
    GroupMenuEl,
    MultiMenuEl,
    CanvasMenuEl,
  ]);
};

export default FlowContextMenu;
