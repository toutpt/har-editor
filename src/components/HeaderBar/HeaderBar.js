
import React from 'react';
import { Stack } from 'office-ui-fabric-react';

import './HeaderBar.css';

export function HeaderBar(props) {
    return (
        <header className="header">
            <Stack horizontal>
                <a href="/har-editor" className="home"><i className="fa fa-home" /></a>
                <a href="https://github.com/toutpt/har-editor" className="github"><i className="fa fa-github" /></a>
            </Stack>
        </header>
    );
}