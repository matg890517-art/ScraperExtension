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

import ScriptChip from './components/ScriptChip';

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
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab.id == null) throw new Error('No active browser tab found.');
      await runScript(tab.id, testScript);
      setStatus('Completed');
    } catch (err) {
      setStatus('Failed');
      setError(err instanceof Error ? err.message : 'Automation failed.');
    } finally {
      setRunning(false);
    }
  }

  return (
    <Stack
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', p: 2 }}>
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            width: 42,
            height: 42,
            borderRadius: 1.5,
            color: 'primary.contrastText',
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          }}
        >
          <AutoAwesomeRoundedIcon />
        </Stack>
        <Stack sx={{ flex: 1, minWidth: 0 }} spacing={0}>
          <Typography variant="h6" sx={{ letterSpacing: '-0.025em' }}>
            Automate
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Browser automation workspace
          </Typography>
        </Stack>
        <Chip
          size="small"
          label={status}
          color={status === 'Completed' ? 'success' : status === 'Failed' ? 'error' : running ? 'info' : 'default'}
          variant="outlined"
        />
      </Stack>

      <Divider />

      <Stack sx={{ flex: 1, p: 2.5 }} spacing={2}>
        <Stack spacing={0}>
          <Typography variant="h6">
            Automation script
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Define actions to automate the current browser tab.
          </Typography>
        </Stack>

        <Paper
          variant="outlined"
          sx={{ p: 1.75, borderRadius: 1.5, bgcolor: 'background.paper', borderColor: 'divider' }}
        >
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="subtitle2">
              Steps
            </Typography>
            <Chip size="small" label={`${testScript.length} actions`} />
          </Stack>

          <Stack spacing={1.25}>
            {testScript.map((action, index) => (
              <Stack
                key={`${action.type}-${index}`}
                direction="row"
                spacing={1.25}
                sx={{
                  alignItems: "center",
                  p: 1.5,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1.125,
                  bgcolor: 'background.default',
                }}
              >
                <Stack
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    width: 28,
                    height: 28,
                    borderRadius: 1,
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'primary.lighter',
                    bgcolor: 'primary.darker',
                  }}
                >
                  {index + 1}
                </Stack>
                <Stack sx={{ flex: 1, minWidth: 0 }} spacing={0}>
                  <Typography variant="subtitle2">
                    {actionDescriptions[action.type] ?? action.type}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', overflowWrap: 'anywhere', mt: 0.375 }}
                  >
                    {'text' in action ? action.text : 'No target specified'}
                  </Typography>
                </Stack>
                <ScriptChip type={action.type} />
              </Stack>
            ))}
          </Stack>
        </Paper>

        {error && (
          <Paper
            variant="outlined"
            sx={{
              p: 1.5,
              bgcolor: 'rgba(255, 86, 48, 0.08)',
              borderColor: 'error.dark',
            }}
          >
            <Typography variant="body2" color="error.light">
              {error}
            </Typography>
          </Paper>
        )}

        <Stack spacing={0}>
          <Typography variant="caption" color="text.secondary">
            Script editor
          </Typography>
          <Typography variant="body2">
            Editing and adding steps will be enabled in the next step.
          </Typography>
        </Stack>
      </Stack>

      <Stack
        spacing={1.25}
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
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
      </Stack>
    </Stack>
  );
}

export default App;
