import { createClient } from '@/utils/supabase/server';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TaskCard from './ui/task-card';
import TasksFilters from './ui/tasks-filters';

export default async function Home() {
  const supabase = await createClient();

  const { data: tasks } = await supabase.from('tasks').select();

  return (
    <Container sx={{ mt: 10, mb: 2 }}>
      <TasksFilters />

      <Grid container spacing={2}>
        {tasks!
          .map((i) => ({
            id: i.id,
            title: i.title,
            description: i.description,
            type: i.type,
            isRepeated: i.isRepeated,
            repeatedDays: i.repeatedDays,
            distanceMeters: i.distanceMeters,
          }))
          .map((task) => (
            <Grid key={task.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <TaskCard {...task} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
