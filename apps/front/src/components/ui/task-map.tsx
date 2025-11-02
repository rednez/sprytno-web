'use client';

import useCoords from '@/hooks/coords';
import {
  AdvancedMarker,
  APIProvider,
  Map,
  MapMouseEvent,
} from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { LocationAlert } from './location-alert';

export function TaskMap({
  apiKey,
  googleMapsMapId,
  initPosition,
  onSetPosition,
}: {
  apiKey: string;
  googleMapsMapId: string;
  initPosition?: { lat: number; lng: number };
  onSetPosition?: (position: { lat: number; lng: number }) => void;
}) {
  const { coords, isError, isProgress } = useCoords();
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    initPosition || null,
  );

  if (isProgress) {
    return null;
  }

  if (!coords || isError) {
    return <LocationAlert />;
  }

  function handleClick(event: MapMouseEvent) {
    if (!onSetPosition) {
      return;
    }
    setPosition(event.detail.latLng);
    onSetPosition(event.detail.latLng);
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        mapId={googleMapsMapId}
        style={{ width: '100%', height: '100%' }}
        defaultCenter={initPosition || { lat: coords.lat, lng: coords.lng }}
        defaultZoom={15}
        gestureHandling="greedy"
        disableDefaultUI
        onClick={handleClick}
      >
        {position && <AdvancedMarker position={position} />}
      </Map>
    </APIProvider>
  );
}
