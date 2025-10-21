'use client';

import EmptyState from '@/components/ui/empty-state';
import TasksFilters from '@/components/ui/tasks-filters';
import useCoords from '@/hooks/coords';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import TasksList from '../components/tasks-list';
import { Container } from '@mui/material';

export default function NearbyTasks() {
  const { coords, getLocation, isProgress, isError } = useCoords();
  const [taskType, setTaskType] = useState<'all' | 'offers' | 'requests'>(
    'all',
  );
  const [distance, setDistance] = useState<number>(500);

  const nearbyTasks = () =>
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
    <Container sx={{ mt: 3, mb: 2 }}>
      <TasksFilters
        distance={distance}
        onChangeDistance={setDistance}
        onChangeTaskType={setTaskType}
      />

      {isProgress ? null : nearbyTasks()}
    </Container>
  );
}
