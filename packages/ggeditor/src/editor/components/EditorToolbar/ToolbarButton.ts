import { Tooltip } from 'antd';
import { Command } from 'gg-editor';
import React from 'react';
import IconFont from '../../common/IconFont';
import { CommandProps } from '../../editor-interface';
// import styles from './index.less';

const ToolbarButton = ({ command, text, icon }:  CommandProps):any => {

    return React.createElement(Command, { name: command }, [
        React.createElement(Tooltip, { title: text, placement: "bottom", overlayClassName: "tooltip" },
            React.createElement(IconFont, { type: `icon-${icon || command}` }))
    ])

    //   return (
    //     <Command name={command}>
    //       <Tooltip
    //         title={text || upperFirst(command)}
    //         placement="bottom"
    //         overlayClassName={styles.tooltip}
    //       >
    //         <IconFont type={`icon-${icon || command}`} />
    //       </Tooltip>
    //     </Command>
    //   );
};

export default ToolbarButton;
