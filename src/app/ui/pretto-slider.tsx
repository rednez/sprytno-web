import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

export const PrettoSlider = styled(Slider)(({ theme }) => [
  {
    color: theme.palette.primary.main,
    height: 4,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&::before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: '2px 6px',
      borderRadius: '4px',
      backgroundColor: theme.palette.primary.main,
      '&::before': { display: 'none' },
    },
  },
]);
