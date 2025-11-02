'use client';

import useCoords from '@/hooks/coords';
import { Alert, Button } from '@heroui/react';

export function LocationAlert() {
  const { getLocation } = useCoords();

  return (
    <Alert
      title="Enable Location"
      description="You should allow location access to see tasks around you"
      variant="faded"
      color="warning"
      endContent={
        <Button
          variant="flat"
          color="warning"
          onPress={getLocation}
        >
          Enable
        </Button>
      }
    />
  );
}
