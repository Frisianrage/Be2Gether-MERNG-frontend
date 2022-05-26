import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { Button } from '@mui/material';

import Spinner from '../Spinner'
import {GET_USER_BY_EMAIL} from '../../utils/graphql/queries'

function Search({setPartner}) {
    const [email, setEmail]= useState('')

    const [getUserByEmail, { loading, error, data}] = useLazyQuery(GET_USER_BY_EMAIL, {
        variables: { email }
    });

    if(error){
        console.log(error)
    }

    useEffect(()=>{
        if(data){
          setPartner({user: data.getUserByEmail,
        status: "none"})  
        }
        
    },[setPartner, data])

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const handleClick = ( ) => {
        getUserByEmail()
    }

    return (
        <>
        {loading ? <Spinner loading={loading} /> :
            <div className="partnersearch" style={{marginTop: "2rem"}}>
                <h3>Look for your partner via email</h3>
                <input style={{padding: "0.5rem 1rem"}}id="partnersearch" type="text" placeholder="Look for your partner" onChange={handleChange} name="partner" />
                <Button variant="contained" size="small" style={{marginLeft: "1rem"}} onClick={handleClick}>Search</Button> 
            </div> 
        }  
        </>
    )
}

export default Search
