import React, { useContext, useEffect} from 'react'
import {useMutation} from '@apollo/client'
import {Button} from '@mui/material';
import {AuthContext} from '../context/auth'
import {LOGIN_USER} from '../utils/graphql/mutations'

function HomeScreen({history}) {
  const { user, login } = useContext(AuthContext)
  const email = process.env.REACT_APP_DEMO_MAIL
  const password = process.env.REACT_APP_DEMO_PASSWORD

  const [loginUser] = useMutation(LOGIN_USER, {
    update(proxy, result){
        login(result.data.login)
        history.push('/profile')
    },
    onError(err){
        console.log(JSON.stringify(err, null, 2))
    },
    variables: {email, password}
})

  const demoHandler = (e) => {
    e.preventDefault()
    loginUser() 
  }

  useEffect(() => {
    if(user){
        history.push('/profile')
    }
  }, [user,history])

  return (
      <div className="home">
        <div className="home-header">
          <h1 >Be2Gether</h1>
          <h3>The place for couples in long distance relationships</h3>
          <div>
           <Button variant="contained" size="large" href="/login" className="btn">Login</Button>
          <Button variant="contained" size="large" href="/signup" className="btn">SignUp</Button>
          <div>
           <Button variant="outlined" color="secondary" size="large" className="demo-btn" onClick={demoHandler}>Take a demo</Button> 
          </div> 
          </div>
          
          
        </div>
         
      </div>
  )
}

export default HomeScreen;

