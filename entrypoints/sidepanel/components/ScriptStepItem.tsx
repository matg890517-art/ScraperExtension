import { Chip, Stack, Typography } from '@mui/material';
import type { Action } from '../automation/types';

type ScriptStepItemProps = {
  action: Action;
  index: number;
  description: string;
};

export default function ScriptStepItem({
  action,
  index,
  description,
}: ScriptStepItemProps) {
  return (
    <Stack
      direction="row"
      spacing={1.25}
      sx={{
        alignItems: 'center',
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
        <Typography variant="subtitle2">{description}</Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', overflowWrap: 'anywhere', mt: 0.375 }}
        >
          {'text' in action ? action.text : 'No target specified'}
        </Typography>
        {action.type === 'waitFor' && (
          <Typography variant="caption" color="text.secondary">
            Timeout: {action.timeout ?? 10000} ms
          </Typography>
        )}
      </Stack>
      <Chip size="small" variant="outlined" label={action.type} />
    </Stack>
  );
}
