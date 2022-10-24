import { Box, CssBaseline, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'

const Footer = () => {
  return (
  <Box mt={5}
    sx={{
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <CssBaseline />
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          Travelers Social Media App || Gonçalo Santos || Code Immersives
        </Typography>
      </Container>
    </Box>
  </Box>
  )
}

export default Footer