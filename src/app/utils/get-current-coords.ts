export async function getCurrentCoords(): Promise<{
  lat: number;
  lng: number;
}> {
  return new Promise((resolve, reject) => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => {
        reject(`ERROR(${err.code}): ${err.message}`);
      },
      options,
    );
  });
}
