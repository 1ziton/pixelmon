import React from 'react';
import { Card } from 'antd';
import { Minimap } from 'gg-editor';

const EditorMinimap = () => {
   return React.createElement(Card, { type: "inner", size: "small", title: "Minimap", bordered: false, key: 'minimap-panel' }, React.createElement(Minimap, { height: 200 }))
    //   return (
    //     <Card type="inner" size="small" title="Minimap" bordered={false}>
    //       <Minimap height={200} />
    //     </Card>
    //   );
};

export default EditorMinimap;