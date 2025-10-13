'use client';

import { Task } from '@/types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TaskDistance from './task-distance';
import TaskRepeatingInfo from './task-repeating-info';
import TaskTypeChip from './task-type-chip';

export default function TaskCard({
  title,
  description,
  type,
  distanceMeters,
  repeatedDays,
}: Task) {
  return (
    <Card
      sx={[
        () => ({
          height: '100%',
          borderRadius: 3,
          boxShadow: '-1px 8px 6px -10px rgba(0,0,0,0.2)',
          border: '1px solid',
          borderColor: (theme) => theme.vars?.palette.divider,
        }),
        (theme) =>
          theme.applyStyles('dark', {
            border: 0,
          }),
      ]}
    >
      <CardContent>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="subtitle1" fontWeight={500} lineHeight={1.3}>
            {title}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
          <TaskTypeChip type={type} />
          <Divider orientation="vertical" flexItem />
          <TaskDistance meters={distanceMeters} />

          {!!repeatedDays.length && (
            <>
              <Divider orientation="vertical" flexItem />
              <TaskRepeatingInfo repeatedDays={repeatedDays} />
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
