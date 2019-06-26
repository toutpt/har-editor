import React from 'react';
import './App.css';
import { Stack } from "office-ui-fabric-react";
import { HeaderBar } from './components/HeaderBar';
import { Menu } from './components/Menu';
import { Content } from './components/Content';

function App() {
  return (
    <Stack>
      <HeaderBar />
      <Stack horizontal>
        <Menu />
        <Content />
      </Stack>
    </Stack>
  );
}

export default App;
