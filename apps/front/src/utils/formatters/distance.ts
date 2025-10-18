export const distance = (meters: number) => {
  const isKilometers = meters > 1000;
  const unit = isKilometers ? 'kilometer' : 'meter';
  const value = isKilometers ? meters / 1000 : meters;

  return new Intl.NumberFormat('en-US', {
    style: 'unit',
    unit,
    unitDisplay: 'short',
  }).format(value);
};
