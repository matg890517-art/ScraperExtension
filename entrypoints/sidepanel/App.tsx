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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2 }}>
        <Box
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
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6" sx={{ letterSpacing: '-0.025em' }}>
            Automate
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Browser automation workspace
          </Typography>
        </Box>
        <Chip
          size="small"
          label={status}
          color={status === 'Completed' ? 'success' : status === 'Failed' ? 'error' : running ? 'info' : 'default'}
          variant="outlined"
        />
      </Box>

      <Divider />

      <Box sx={{ flex: 1, p: 2.5 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={700}>
            Automation script
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Define actions to automate the current browser tab.
          </Typography>
        </Box>

        <Paper
          variant="outlined"
          sx={{ p: 1.75, borderRadius: 1.5, bgcolor: 'background.paper', borderColor: 'divider' }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Steps
            </Typography>
            <Chip size="small" label={`${testScript.length} actions`} />
          </Box>

          <Stack spacing={1.25}>
            {testScript.map((action, index) => (
              <Box
                key={`${action.type}-${index}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.25,
                  p: 1.5,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1.125,
                  bgcolor: 'background.default',
                }}
              >
                <Box
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
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" fontWeight={600}>
                    {actionDescriptions[action.type] ?? action.type}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', overflowWrap: 'anywhere', mt: 0.375 }}
                  >
                    {'text' in action ? action.text : 'No target specified'}
                  </Typography>
                </Box>
                <Chip size="small" variant="outlined" label={action.type} />
              </Box>
            ))}
          </Stack>
        </Paper>

        {error && (
          <Paper
            variant="outlined"
            sx={{
              mt: 2,
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

        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Script editor
          </Typography>
          <Typography variant="body2">
            Editing and adding steps will be enabled in the next step.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.25,
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
      </Box>
    </Box>
  );
}

export default App;
