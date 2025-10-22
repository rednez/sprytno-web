'use client';

import styled from '@emotion/styled';

const Sprytno = styled('span')({
  fontFamily: 'Oswald',
  fontSize: '1.5rem',
});

const Preview = styled('span')({
  fontSize: '0.75rem',
  fontWeight: 300,
});

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export default function SprytnoLogo() {
  return (
    <Container>
      <Sprytno>sprytno</Sprytno>
      <Preview>Preview</Preview>
    </Container>
  );
}
