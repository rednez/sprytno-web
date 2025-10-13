import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function EmptyState({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={[
          (theme) => ({
            borderRadius: 2,
            backgroundColor: theme.palette.grey[100],
            width: 'fit-content',
            padding: theme.spacing(2, 4),
          }),
          (theme) =>
            theme.applyStyles('dark', {
              backgroundColor: theme.palette.grey[900],
            }),
        ]}
      >
        {children}
      </Box>
    </Container>
  );
}
