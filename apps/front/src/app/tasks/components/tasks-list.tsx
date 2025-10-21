'use client';

import EmptyState from '@/components/ui/empty-state';
import TaskCard from '@/components/ui/task-card';
import useTasks from '@/hooks/tasks';
import { Box, CircularProgress } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

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

  const loadedData = () =>
    data?.length ? (
      <Grid container spacing={2}>
        {data
          .map((i) => ({
            id: i.id,
            title: i.title,
            description: i.description,
            type: i.type,
            repeatedDays: i.repeatedDays,
            distanceMeters: i.distanceMeters,
          }))
          .map((task) => (
            <Grid key={task.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <TaskCard {...task} />
            </Grid>
          ))}
      </Grid>
    ) : (
      emptyState()
    );

  const emptyState = () => (
    <EmptyState>
      <Typography variant="body1" align="center">
        No tasks found
      </Typography>
    </EmptyState>
  );

  const loader = () => (
    <Box textAlign="center" sx={{ mt: 4 }}>
      <CircularProgress />
    </Box>
  );

  return <Container>{isPending ? loader() : loadedData()}</Container>;
}
