import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FaRepeat } from 'react-icons/fa6';

const Day = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={(theme) => ({
      backgroundColor: theme.vars?.palette.action.selected,
      padding: '2px 4px',
      display: 'flex',
      borderRadius: '6px',
    })}
  >
    <Typography variant="caption">{children}</Typography>
  </Box>
);

export function TaskRepeatingInfo({
  repeatedDays,
}: {
  repeatedDays: string[];
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        sx={(theme) => ({
          fontSize: 12,
          color: theme.vars?.palette.text.secondary,
        })}
      >
        <FaRepeat />
      </Box>

      {repeatedDays.length ? (
        <Box sx={{ display: 'flex', gap: '4px' }}>
          {repeatedDays.map((day) => (
            <Day key={day}>{day}</Day>
          ))}
        </Box>
      ) : (
        <Day>daily</Day>
      )}
    </Box>
  );
}

export default TaskRepeatingInfo;
