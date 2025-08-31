'use client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Task } from './interfaces/task';
import TaskCard from './ui/task-card';
import TasksFilters from './ui/tasks-filters';

export default function Home() {
  const tasks: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description for Task 1',
      type: 'offer',
      isRepeated: true,
      repeatedDays: [],
      distanceMeters: 300,
    },
    {
      id: 2,
      title: 'Task 2',
      description:
        'Description for Task 2 very long and informative text that goes into detail about the task requirements and expectations. For example, it could include specific goals, deadlines, and any relevant background information.',
      type: 'offer',
      isRepeated: true,
      repeatedDays: ['mo', 'we'],
      distanceMeters: 1200,
    },
    {
      id: 3,
      title:
        'Task 3 very long title that keeps going very very long lorem ipsum dolor sit amet',
      description: 'Description for Task 3',
      type: 'request',
      isRepeated: true,
      repeatedDays: ['mo', 'we', 'thu'],
      distanceMeters: 149,
    },
    {
      id: 4,
      title: 'Task 4',
      description: 'Description for Task 4',
      type: 'offer',
      isRepeated: false,
      repeatedDays: [],
      distanceMeters: 498,
    },
    {
      id: 5,
      title: 'Some name for Task 5',
      description:
        'Description for Task with details about the task requirements and expectations.',
      type: 'offer',
      isRepeated: false,
      repeatedDays: [],
      distanceMeters: 498,
    },
    {
      id: 6,
      title: 'Some name for Task 6',
      description:
        'Description for Task with details about the task requirements and expectations.',
      type: 'offer',
      isRepeated: false,
      repeatedDays: [],
      distanceMeters: 498,
    },
    {
      id: 7,
      title: 'Some name for Task 7',
      description:
        'Description for Task with details about the task requirements and expectations.',
      type: 'offer',
      isRepeated: false,
      repeatedDays: [],
      distanceMeters: 498,
    },
    {
      id: 8,
      title: 'Some name for Task 8',
      description:
        'Description for Task with details about the task requirements and expectations.',
      type: 'offer',
      isRepeated: false,
      repeatedDays: [],
      distanceMeters: 876.2,
    },
  ];

  return (
    <Container sx={{ mt: 10, mb: 2 }}>
      <TasksFilters />

      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid key={task.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <TaskCard {...task} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
