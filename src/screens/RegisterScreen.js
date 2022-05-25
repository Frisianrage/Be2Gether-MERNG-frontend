import React, {useContext, useState} from 'react'
import Spinner from '../components/Spinner'
import {useMutation} from '@apollo/client'
import {Link} from 'react-router-dom';
import {Avatar,Box, Button, Container, CssBaseline, Grid, TextField, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import {AuthContext} from '../context/auth'
import { REGISTER_USER } from '../utils/graphql/mutations'

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

export default function RegisterScreen({history}) {
  //const theme = useTheme;
  const { login } = useContext(AuthContext)
  //const [errors, setErrors] = useState({})

  const initialState =  {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [values, setValues] = useState(initialState)

  const onChange = (event) => {
      setValues({...values, [event.target.id] : event.target.value})
  }
  
  const [addUser, {loading} ] = useMutation(REGISTER_USER, {
      update(proxy, result){
        console.log(result.data.register)
          login(result.data.register)
          history.push('/profile')
      },
      onError(err){
          console.log({err})
      },
      variables: values
  })

  const handleSubmit = (e) => {
      e.preventDefault()
      addUser()
  }

  return (
  
    <Container component="main" maxWidth="xs">
      {loading &&
                <Spinner loading={loading} />}
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
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="Firstname"
            name="firstname"
            autoComplete="firstname"
            autoFocus
            value={values.firstname}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Lastname"
            name="lastname"
            autoComplete="lastname"
            autoFocus
            value={values.lastname}
            onChange={onChange}
          />
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            value={values.confirmPassword}
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
              <Link to={"/login"} variant="body2">
                {"Already an account? Login"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  
  );
}