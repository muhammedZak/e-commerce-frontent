import React from 'react';
import { Button } from '@mui/material';
// import { hover } from '@testing-library/user-event/dist/hover';

const styles = {
  width: '100%',
  paddingY: 1.5,
  paddingX: 8,
  border: '2px solid',
  color: 'white',
  backgroundColor: 'black',
};

const ButtonComponent = () => {
  return (
    <Button variant="contained" sx={styles}>
      Buy Now
    </Button>
  );
};

export default ButtonComponent;
