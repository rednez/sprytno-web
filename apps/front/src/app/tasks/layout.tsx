'use client';

import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { SyntheticEvent, useState } from 'react';

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ mt: 10 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Tasks tabs"
          centered
        >
          <Tab LinkComponent={Link} href="/tasks/nearby" label="Nearby" />
          <Tab LinkComponent={Link} href="/tasks/my" label="Created by me" />
          <Tab LinkComponent={Link} href="/tasks/picked" label="Picked tasks" />
        </Tabs>
      </Box>

      {children}
    </Container>
  );
}
