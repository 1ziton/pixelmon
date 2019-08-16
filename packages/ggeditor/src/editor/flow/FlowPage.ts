import React from 'react';
import { Row, Col } from 'antd';
import GGEditor, { Flow } from 'gg-editor';
import EditorMinimap from '../components/EditorMinimap/EditorMinimap';
import { FlowContextMenu } from '../components/EditorContextMenu';
import { FlowToolbar } from '../components/EditorToolbar';
import FlowItemPanel from '../components/EditorItemPanel/FlowItemPanel';
import { FlowDetailPanel } from '../components/EditorDetailPanel';
// import styles from './index.less';

const FlowPage = (props): any => {
    const { data } = props;
    return React.createElement(GGEditor, { className: "editor" }, [
        React.createElement(Row, { type: "flex", className: "editorHd" }, [
            React.createElement(Col, { span: 24 }, FlowToolbar())
        ]),
        React.createElement(Row, { type: "flex", className: "editorBd" }, [
            React.createElement(Col, { span: 4, className: "editorSidebar" }, FlowItemPanel()),
            React.createElement(Col, { span: 16, className: "editorContent" }, React.createElement(Flow, { data, style: { width: "100%", height: "100%" } })),
            React.createElement(Col, { span: 4, className: "editorSidebar" }, [FlowDetailPanel(), EditorMinimap()]),
        ]),
        FlowContextMenu()
    ]);
    //   return (
    //     <GGEditor className={styles.editor}>
    //       <Row type="flex" className={styles.editorHd}>
    //         <Col span={24}>
    //           <FlowToolbar />
    //         </Col>
    //       </Row>
    //       <Row type="flex" className={styles.editorBd}>
    //         <Col span={4} className={styles.editorSidebar}>
    //           <FlowItemPanel />
    //         </Col>
    //         <Col span={16} className={styles.editorContent}>
    //           <Flow className={styles.flow} />
    //         </Col>
    //         <Col span={4} className={styles.editorSidebar}>
    //           <FlowDetailPanel />
    //           <EditorMinimap />
    //         </Col>
    //       </Row>
    //       <FlowContextMenu />
    //     </GGEditor>
    //   );
};

export default FlowPage;