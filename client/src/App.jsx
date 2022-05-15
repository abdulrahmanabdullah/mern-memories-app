import React from 'react'
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material'
import { useStyle } from './style';

const App = () => {
    const classes = useStyle();
  return (
      <Container maxWidth='lg'>
          <AppBar className={classes.appBar} position='static' color='inherit'>
              {/* website title and logo */}
            <Typography variant='h2' className={classes.heading} > Social media app </Typography>
            <img src='' alt='logo' className={classes.image} height='60'/>
          </AppBar>
          <Grow in>
                <Container>
                    <Grid container justifyContent='space-between' spacing={3} alignItems='stretch'>
                       <Grid item xs={12} sm={7}>
                            <div> Posts </div>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                                <div>Form</div>
                        </Grid>
                    </Grid>
                </Container>
          </Grow>
      </Container>
  )
}

export default App

