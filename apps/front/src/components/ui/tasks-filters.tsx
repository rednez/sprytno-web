'use client';

import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';

export default function TasksFilters({
  distance,
  onChangeTaskType,
  onChangeDistance,
}: {
  distance: number;
  onChangeTaskType: (type: 'all' | 'offers' | 'requests') => void;
  onChangeDistance: (distance: number) => void;
}) {
  const [type, setType] = useState<'all' | 'offers' | 'requests'>('all');

  function handleChangeDistance(e: React.BaseSyntheticEvent) {
    onChangeDistance(Number(e.target.value));
  }

  function handleType(
    event: React.MouseEvent<HTMLElement>,
    type: 'all' | 'offers' | 'requests',
  ) {
    setType(type);
    onChangeTaskType(type);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        pb: 3,
        gap: 2,
      }}
    >
      <NumericFormat
        value={distance}
        customInput={TextField}
        size="small"
        label="Distance, meters"
        onChange={handleChangeDistance}
      />

      <ToggleButtonGroup
        value={type}
        size="small"
        color="primary"
        exclusive
        aria-label="task type"
        onChange={handleType}
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="offers">Offers</ToggleButton>
        <ToggleButton value="requests">Requests</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
