import { Chip } from '@mui/material';

type ScriptChipProps = {
  type: string;
};

export default function ScriptChip({ type }: ScriptChipProps) {
  return <Chip size="small" variant="outlined" label={type} />;
}
