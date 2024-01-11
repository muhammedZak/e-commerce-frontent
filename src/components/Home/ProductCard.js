import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import ButtonComponent from './Button';

const ProductCard = () => {
  return (
    <Grid item xs={3}>
      <div className="my-6 w-96">
        <Paper elevation={5}>
          <img
            className="w-full h-full object-contain"
            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdhdGNoZXN8ZW58MHx8MHx8fDA%3D"
            alt="img"
          />
          <Box>
            <ButtonComponent />
          </Box>
        </Paper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="h3">
            Product Name
          </Typography>
          <Typography variant="h6" component="h3">
            Product Name
          </Typography>
        </Box>
      </div>
    </Grid>
  );
};

export default ProductCard;
