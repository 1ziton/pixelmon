import React from 'react';
import { Divider } from 'antd';
import { Toolbar } from 'gg-editor';
import ToolbarButton from './ToolbarButton';
// import styles from './index.less';
//
const FlowToolbar = () => {
  return React.createElement(Toolbar, { className: 'toolbar' }, [
    ToolbarButton({ command: 'undo', key: 'undo1' }),
    ToolbarButton({ command: 'redo', key: 'redo2' }),
    React.createElement(Divider, { type: 'vertical', key: 'vertical1' }),
    ToolbarButton({ command: 'copy', key: 'copy' }),
    ToolbarButton({ command: 'paste', key: 'paste' }),
    ToolbarButton({ command: 'delete', key: 'delete' }),
    React.createElement(Divider, { type: 'vertical', key: 'vertical4' }),
    ToolbarButton({ command: 'zoomIn', icon: 'zoom-in', text: 'Zoom In', key: 'zoomIn' }),
    ToolbarButton({ command: 'zoomOut', icon: 'zoom-out', text: 'Zoom Out', key: 'zoomOut' }),
    ToolbarButton({ command: 'autoZoom', icon: 'fit-map', text: 'Auto Zoom', key: 'autoZoom' }),
    ToolbarButton({ command: 'resetZoom', icon: 'actual-size', text: 'Actual Size', key: 'resetZoom' }),
    React.createElement(Divider, { type: 'vertical', key: 'vertical2' }),
    ToolbarButton({ command: 'toBack', icon: 'to-back', text: 'To Back', key: 'toBack' }),
    ToolbarButton({ command: 'toFront', icon: 'to-front', text: 'To Front', key: 'toFront' }),
    React.createElement(Divider, { type: 'vertical', key: 'vertical3' }),
    ToolbarButton({ command: 'multiSelect', icon: 'multi-select', text: 'Multi Select', key: 'multiSelect' }),
    ToolbarButton({ command: 'addGroup', icon: 'group', text: 'Add Group', key: 'addGroup' }),
    ToolbarButton({ command: 'unGroup', icon: 'ungroup', text: 'Ungroup', key: 'unGroup' }),
  ]);
  //   return (
  //     <Toolbar className={styles.toolbar}>
  //       <ToolbarButton command="undo" />
  //       <ToolbarButton command="redo" />
  //       <Divider type="vertical" />
  //       <ToolbarButton command="copy" />
  //       <ToolbarButton command="paste" />
  //       <ToolbarButton command="delete" />
  //       <Divider type="vertical" />
  //       <ToolbarButton command="zoomIn" icon="zoom-in" text="Zoom In" />
  //       <ToolbarButton command="zoomOut" icon="zoom-out" text="Zoom Out" />
  //       <ToolbarButton command="autoZoom" icon="fit-map" text="Fit Map" />
  //       <ToolbarButton command="resetZoom" icon="actual-size" text="Actual Size" />
  //       <Divider type="vertical" />
  //       <ToolbarButton command="toBack" icon="to-back" text="To Back" />
  //       <ToolbarButton command="toFront" icon="to-front" text="To Front" />
  //       <Divider type="vertical" />
  //       <ToolbarButton command="multiSelect" icon="multi-select" text="Multi Select" />
  //       <ToolbarButton command="addGroup" icon="group" text="Add Group" />
  //       <ToolbarButton command="unGroup" icon="ungroup" text="Ungroup" />
  //     </Toolbar>
  //   );
};

export default FlowToolbar;
