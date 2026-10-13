import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import './App.css';

import { runScript } from './automation/engine';
import type { Script } from './automation/types';
import { Button } from '@mui/material';

const testScript: Script = [
  {
    type: 'waitFor',
    text: 'Login',
  },
  {
    type: 'click',
    text: 'Login',
  },
  {
    type: 'waitFor',
    text: 'Username',
    timeout: 1000,
  },
  {
    type: 'click',
    text: 'Username',
  },
];

async function runAutomation() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab.id) {
    throw new Error('No active tab');
  }

  await runScript(tab.id, testScript);
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://wxt.dev" target="_blank">
          <img src={wxtLogo} className="logo" alt="WXT logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>WXT + React</h1>
      <div className="card">
        <button onClick={runAutomation}>
          count is {count}
        </button>
        <Button
          variant="contained"
          onClick={runAutomation}
        >
          Run
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the WXT and React logos to learn more
      </p>
    </>
  );
}

export default App;
