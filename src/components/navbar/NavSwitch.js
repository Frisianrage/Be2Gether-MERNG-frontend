import React, { useContext } from 'react'
import {AuthContext} from '../../context/auth'
import NavBar from './NavBar'
import AuthNavBar from './AuthNavBar'

const NavSwitch = () => {
    const { user } = useContext(AuthContext)

    return (
    <>
        {user ? <AuthNavBar /> : <NavBar />}
    </> 
    )
}

export default NavSwitch