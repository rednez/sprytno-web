'use client';

import { getCurrentCoords } from '@/utils';
import { useEffect, useState } from 'react';

export default function useCoords() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [isProgress, setIsProgress] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsProgress(true);
    setIsError(false);
    (async () => {
      try {
        const { lat, lng } = await readStorage();
        setCoords({ lat, lng });
        setIsProgress(false);
      } catch {
        setIsProgress(false);
        setIsError(true);
      }
    })();
  }, []);

  async function readStorage(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const storedLat = localStorage.getItem('lat');
        const storedLng = localStorage.getItem('lng');

        if (storedLat && storedLng) {
          resolve({ lat: parseFloat(storedLat), lng: parseFloat(storedLng) });
        } else {
          reject('Error: no stored coords');
        }
      }, 20);
    });
  }

  async function getLocation() {
    setIsError(false);

    try {
      const coordinates = await getCurrentCoords();
      setCoords(coordinates);
      localStorage.setItem('lat', coordinates.lat.toString());
      localStorage.setItem('lng', coordinates.lng.toString());
    } catch (error) {
      setIsError(true);
    }
  }

  return { coords, getLocation, isProgress, isError };
}
