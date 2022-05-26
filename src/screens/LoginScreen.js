import React, {useContext, useState} from 'react'
import {useMutation} from '@apollo/client'
import {Link} from 'react-router-dom';
import {Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {AuthContext} from '../context/auth'
import {LOGIN_USER} from '../utils/graphql/mutations'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to={"/"}>
        Be2Gether
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function LoginScreen({history}) {
  const {login} = useContext(AuthContext)
  //const [errors, setErrors] = useState({})

    const initialState =  {
        email: '',
        password: ''
    }

    const [values, setValues] = useState(initialState)

    const onChange = (event) => {
        setValues({...values, [event.target.id] : event.target.value})
    }

    const [loginUser] = useMutation(LOGIN_USER, {
        update(proxy, result){
            login(result.data.login)
            history.push('/profile')
        },
        onError(err){
            console.log(JSON.stringify(err, null, 2))
        },
        variables: values
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        loginUser();
    } 

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={values.email}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={values.password}
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to={'#'} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={"/signup"} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}