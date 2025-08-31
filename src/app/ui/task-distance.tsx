import Typography from '@mui/material/Typography';

export default function TaskDistance({ meters }: { meters: number }) {
  return (
    <Typography variant="body2" color="textSecondary">
      {meters} meters
    </Typography>
  );
}
