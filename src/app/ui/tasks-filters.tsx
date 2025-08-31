import Box from '@mui/material/Box';
import { PrettoSlider } from './pretto-slider';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Typography from '@mui/material/Typography';

export default function TasksFilters() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        pb: 3,
        gap: 2,
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Typography id="input-slider" gutterBottom>
          Distance, meters
        </Typography>
        <PrettoSlider
          defaultValue={[0, 300]}
          min={0}
          max={1000}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} m`}
          disableSwap
        />
      </Box>

      <ToggleButtonGroup
        size="small"
        color="primary"
        exclusive
        aria-label="task type"
      >
        <ToggleButton value="offers">Offers</ToggleButton>
        <ToggleButton value="requests">Requests</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
