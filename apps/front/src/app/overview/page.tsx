'use client';

import EmptyState from '@/components/ui/empty-state';
import TasksFilters from '@/components/ui/tasks-filters';
import useCoords from '@/hooks/coords';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import TasksList from './components/tasks-list';

export default function Home() {
  const { coords, getLocation, isProgress, isError } = useCoords();
  const [taskType, setTaskType] = useState<'all' | 'offers' | 'requests'>(
    'all',
  );
  const [distance, setDistance] = useState<number>(500);

  const loader = () => (
    <Box textAlign="center" sx={{ mt: 4 }}>
      <CircularProgress />
    </Box>
  );

  const loadedCoords = () =>
    coords && !isError ? (
      <TasksList
        lat={coords.lat}
        lng={coords.lng}
        type={taskType}
        distance={distance}
      />
    ) : (
      emptyState()
    );

  const emptyState = () => (
    <EmptyState>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="body1" align="center">
          You should allow location access to see tasks around you
        </Typography>
        <Button variant="contained" onClick={getLocation}>
          Enable location
        </Button>
      </Box>
    </EmptyState>
  );

  return (
    <Container sx={{ mt: 10, mb: 2 }}>
      <TasksFilters
        distance={distance}
        onChangeDistance={setDistance}
        onChangeTaskType={setTaskType}
      />

      {isProgress ? null : loadedCoords()}
    </Container>
  );
}
