import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { FaRepeat } from 'react-icons/fa6';

const RepeatIcon = styled(FaRepeat)(({ theme }) => [
  {
    fontSize: 12,
    color: theme.vars?.palette.text.secondary,
  },
]);

const DayDecorator = styled(Box)(({ theme }) => ({
  backgroundColor: theme.vars?.palette.action.selected,
  padding: '2px 4px',
  display: 'flex',
  borderRadius: '6px',
}));

const Day = ({ children }: { children: React.ReactNode }) => (
  <DayDecorator>
    <Typography variant="caption">{children}</Typography>
  </DayDecorator>
);

export function TaskRepeatingInfo({
  repeatedDays,
}: {
  repeatedDays: string[];
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <RepeatIcon />
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
