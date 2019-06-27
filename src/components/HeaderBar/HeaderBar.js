
import React from 'react';
import { Stack } from 'office-ui-fabric-react';

import './HeaderBar.css';

export function HeaderBar(props) {
    return (
        <header className="header">
            <Stack horizontal>
                <a href="/har-editor" className="ms-StackItem home"><i className="fa fa-home" />HAR Editor</a>
                <a href="https://github.com/toutpt/har-editor" className="ms-StackItem github"><i className="fa fa-github" />Fork me on github</a>
            </Stack>
        </header>
    );
}