
import { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import './App.css';

import { runScript } from './automation/engine';
import type { Script } from './automation/types';

const testScript: Script = [
  { type: 'waitFor', text: 'Login' },
  { type: 'click', text: 'Login' },
  { type: 'waitFor', text: 'Username', timeout: 1000 },
  { type: 'click', text: 'Username' },
];

const actionDescriptions: Record<string, string> = {
  click: 'Click an element',
  type: 'Enter text into an input',
  wait: 'Pause execution',
  waitFor: 'Wait for an element',
};

function App() {
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState('Ready');
  const [error, setError] = useState('');

  async function handleRun() {
    if (running) return;

    setRunning(true);
    setStatus('Running');
    setError('');

    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (tab.id == null) {
        throw new Error('No active browser tab found.');
      }

      await runScript(tab.id, testScript);
      setStatus('Completed');
    } catch (err) {
      setStatus('Failed');
      setError(
        err instanceof Error ? err.message : 'Automation failed.',
      );
    } finally {
      setRunning(false);
    }
  }

  return (
    <Box className="automation-app">
      <Box className="app-header">
        <Box className="brand-icon">
          <AutoAwesomeRoundedIcon />
        </Box>

        <Box flex={1}>
          <Typography variant="h6" className="brand-title">
            Automate
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Browser automation workspace
          </Typography>
        </Box>

        <Chip
          size="small"
          label={status}
          color={
            status === 'Completed'
              ? 'success'
              : status === 'Failed'
                ? 'error'
                : running
                  ? 'info'
                  : 'default'
          }
          variant="outlined"
        />
      </Box>

      <Divider />

      <Box className="editor-content">
        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight={700}>
            Automation script
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Define actions to automate the current browser tab.
          </Typography>
        </Box>

        <Paper variant="outlined" className="script-panel">
          <Box className="script-panel-header">
            <Typography variant="body2" fontWeight={600}>
              Steps
            </Typography>
            <Chip size="small" label={`${testScript.length} actions`} />
          </Box>

          <Stack spacing={1.25}>
            {testScript.map((action, index) => (
              <Box className="action-row" key={`${action.type}-${index}`}>
                <Box className="action-number">{index + 1}</Box>

                <Box flex={1} minWidth={0}>
                  <Typography variant="body2" fontWeight={600}>
                    {actionDescriptions[action.type] ?? action.type}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    className="action-target"
                  >
                    {'text' in action ? action.text : 'No target specified'}
                  </Typography>
                </Box>

                <Chip
                  size="small"
                  variant="outlined"
                  label={action.type}
                />
              </Box>
            ))}
          </Stack>
        </Paper>

        {error && (
          <Paper variant="outlined" className="error-panel">
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          </Paper>
        )}

        <Box mt={2}>
          <Typography variant="caption" color="text.secondary">
            Script editor
          </Typography>
          <Typography variant="body2">
            Editing and adding steps will be enabled in the next step.
          </Typography>
        </Box>
      </Box>

      <Box className="app-footer">
        <Button
          fullWidth
          variant="contained"
          startIcon={<PlayArrowRoundedIcon />}
          onClick={handleRun}
          disabled={running}
        >
          {running ? 'Running…' : 'Run automation'}
        </Button>

        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          startIcon={<StopRoundedIcon />}
          disabled
          title="Stop support will be implemented later"
        >
          Stop
        </Button>
      </Box>
    </Box>
  );
}

export default App;
