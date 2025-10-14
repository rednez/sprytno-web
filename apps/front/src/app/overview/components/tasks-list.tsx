'use client';

import TaskCard from '@/components/ui/task-card';
import useTasks from '@/hooks/tasks';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import EmptyState from './empty-state';

export default function TasksList({
  lat,
  lng,
  type,
  distance,
}: {
  lat: number;
  lng: number;
  type: 'offers' | 'requests' | 'all';
  distance: number;
}) {
  const { data, isPending } = useTasks({ lat, lng, type, distance });

  return (
    <Container>
      {isPending && (
        <Box sx={{ my: 2, textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      )}

      {data && data.length > 0 && (
        <Grid container spacing={2}>
          {data
            .map((i) => ({
              id: i.id,
              title: i.title,
              description: i.description,
              type: i.type,
              repeatedDays: i.repeated_days || [],
              distanceMeters: i.distance_meters,
            }))
            .map((task) => (
              <Grid key={task.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <TaskCard {...task} />
              </Grid>
            ))}
        </Grid>
      )}

      {data && data.length === 0 && (
        <EmptyState>
          <Typography variant="body1" align="center">
            No tasks found
          </Typography>
        </EmptyState>
      )}
    </Container>
  );
}
