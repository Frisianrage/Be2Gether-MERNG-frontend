import React from 'react'
import {Button} from '@mui/material';


function HomeScreen() {

  return (
      <div className="home">
        
        <div className="home-header">
          <h1 >Be2Gether</h1>
          <h3>The place for couples in long distance relationships</h3>
          <Button variant="outlined" size="large" href="/login" className="btn">Login</Button>
          <Button variant="outlined" size="large" href="/signup" className="btn">SignUp</Button>
        </div>
         
      </div>
  )
}

export default HomeScreen;

