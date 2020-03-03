import React from 'react';
import { Stack } from "office-ui-fabric-react";
import { HeaderBar } from './components/HeaderBar';
import { Menu } from './components/Menu';
import { Content } from './components/Content';
import { initializeIcons } from '@uifabric/icons';
import { EditForm } from './components/EditForm/EditForm';

import './App.css';

initializeIcons();



function App() {
  return (
    <Stack>
      <HeaderBar />
      <Stack horizontal>
        <Menu />
        <Content />
      </Stack>
      <EditForm />
    </Stack>
  );
}

export default App;
