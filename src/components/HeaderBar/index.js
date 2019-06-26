
import React from 'react';
import { Stack } from 'office-ui-fabric-react';

import './Header.css';

export function HeaderBar(props) {
    return (
        <header className="ms-Grid-row header">
            <Stack className="ms-Grid-col ms-sm6 ms-md6 ms-lg6" horizontal>
                <a href="/"><i className="fa fa-home" /></a>
            </Stack>
        </header>
    );
}