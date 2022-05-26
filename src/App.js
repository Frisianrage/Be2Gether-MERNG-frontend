import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { AuthProvider } from './context/auth'
import NavSwitch from './components/navbar/NavSwitch'
import PageNotFound from './components/404'
import HomeScreen from './screens/HomeScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from'./screens/ProfileScreen'
import ChatScreen from'./screens/ChatScreen'
import LoginScreen from './screens/LoginScreen'
import MapScreen from './screens/MapScreen'
import EditMemoryScreen from './screens/EditMemoryScreen'
import 'leaflet/dist/leaflet.css';
import './index.css'


function App() {
  
  return (
    <AuthProvider>
      <Router> 
        <NavSwitch />
        <>
          <Switch>
            <Route exact path='/' component={HomeScreen} />
            <Route exact path='/signup' component={RegisterScreen} />
            <Route exact path='/profile' component={ProfileScreen} />
            <Route exact path='/login' component={LoginScreen} />
            <Route exact path='/chat/:id' component={ChatScreen} />
            <Route exact path='/map/:id' component={MapScreen} />
            <Route exact path='/map/:mapId/places/:placeId/edit' component={EditMemoryScreen} />
            <Route exact path="/404" component={PageNotFound} />
            <Redirect path="*" to="/404" />
          </Switch>
        </> 
      </Router>
    </AuthProvider>
      
  );
}

export default App;