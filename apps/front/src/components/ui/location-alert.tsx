'use client';

import { Alert, Button } from '@heroui/react';

export function LocationAlert({
  onGetLocation,
}: {
  onGetLocation: () => void;
}) {
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
          onPress={onGetLocation}
        >
          Enable
        </Button>
      }
    />
  );
}
