import { TaskType } from '@/interfaces/task';
import Chip from '@mui/material/Chip';
import { lightGreen, orange } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';

export default function TaskTypeChip({ type }: { type: TaskType }) {
  return (
    <Chip
      label={type}
      sx={[
        () => ({
          borderColor: 'none',
          backgroundColor: type === 'offer' ? lightGreen[50] : orange[50],
          color: type === 'offer' ? lightGreen[900] : orange[900],
        }),
        (theme) =>
          theme.applyStyles('dark', {
            backgroundColor:
              type === 'offer'
                ? alpha(lightGreen[900], 0.5)
                : alpha(orange[900], 0.5),
            color: type === 'offer' ? lightGreen[100] : orange[100],
          }),
      ]}
      size="small"
    />
  );
}
