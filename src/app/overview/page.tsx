'use client';

import TasksFilters from '@/app/ui/tasks-filters';
import { getCurrentCoords } from '@/app/utils';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import EmptyState from './empty-state';
import TasksList from './tasks-list';

export default function Home() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [taskType, setTaskType] = useState<'all' | 'offers' | 'requests'>(
    'all',
  );
  const [distance, setDistance] = useState<number>(500);

  useEffect(() => {
    const storedLat = localStorage.getItem('lat');
    const storedLng = localStorage.getItem('lng');

    if (storedLat && storedLng) {
      setCoords({ lat: Number(storedLat), lng: Number(storedLng) });
    }
  }, []);

  async function getLocation() {
    try {
      const coordinates = await getCurrentCoords();
      setCoords(coordinates);
      localStorage.setItem('lat', coordinates.lat.toString());
      localStorage.setItem('lng', coordinates.lng.toString());
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  }

  return (
    <Container sx={{ mt: 10, mb: 2 }}>
      <TasksFilters
        distance={distance}
        onChangeDistance={setDistance}
        onChangeTaskType={setTaskType}
      />

      {coords ? (
        <TasksList
          lat={coords.lat}
          lng={coords.lng}
          type={taskType}
          distance={distance}
        />
      ) : (
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
      )}
    </Container>
  );
}
