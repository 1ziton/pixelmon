
import { Command } from 'gg-editor';
import React from 'react';
import IconFont from '../../common/IconFont';
import { CommandProps } from '../../editor-interface';

const menuItemGenerate = ({ command, text, icon }: CommandProps) => {
    let spanText = text || command;
    const spanNode = React.createElement('span', {}, spanText)
    const divNode = React.createElement('div', { className: 'menu-item' }, [React.createElement(IconFont, { type: `icon-${icon || command}` }), spanNode]);
    return React.createElement(Command, { name: command }, divNode);
}


export default menuItemGenerate;
