import React, { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Container } from '@mui/material';
import Spinner from '../components/Spinner'
import UserCard from '../components/profile/UserCard'
import PartnerCard from '../components/profile/PartnerCard'
import Search from '../components/profile/Search'
import RemoveConfirmation from '../components/profile/RemoveConfirmation'
import { ACCEPT_REQUEST_CONNECTION, DELETE_CONNECTION, REQUEST_CONNECTION } from '../utils/graphql/mutations'
import { GET_USER_DETAILS } from '../utils/graphql/queries'
import {AuthContext} from '../context/auth'

function ProfileScreen({history}) {
    const [partner, setPartner] = useState('')
    const [openConfirmation, setOpenConfirmation] = useState(false);

    const { user } = useContext(AuthContext)

    const token = localStorage.getItem('jwtToken')
    
    if(!token) {
        history.push('/')
    }

    const { loading, data } = useQuery(GET_USER_DETAILS, {
        onError: (err) => {
            console.log(JSON.stringify(err, null, 2))
            history.push('/404')
        }     
    })

    useEffect(()=>{
        if(data?.getUserDetails?.connections[0]?.persons){
            const filterdPerson = data.getUserDetails.connections[0].persons.filter(person => person.id !== user.id)
            setPartner({
                user: filterdPerson[0],
                status: data.getUserDetails.connections[0].status,
                requester: data.getUserDetails.connections[0].requester,
                connectionId: data.getUserDetails.connections[0].id
            })
        }
    },[data, setPartner, user.id])

    const [requestConnection, {loading: requestLoading}] = useMutation(REQUEST_CONNECTION,{
        refetchQueries: [
            {
                query: GET_USER_DETAILS
            }
          ],
        onError: (err) => {
            console.log(JSON.stringify(err, null, 2))
        }  
    })

    const [acceptRequestConnection, {loading: acceptLoading}] = useMutation(ACCEPT_REQUEST_CONNECTION,{
        refetchQueries: [
            {
                query: GET_USER_DETAILS
            }
        ],
        onError: (err) => {
            console.log(JSON.stringify(err, null, 2))
        }  
    })

    const [deleteConnection, {loading: deleteLoading}] = useMutation(DELETE_CONNECTION,{
        refetchQueries: [
            {
                query: GET_USER_DETAILS
            }
        ],
        onError: (err) => {
            console.log(JSON.stringify(err, null, 2))
        }  
    })

    const handleRequest = (e) => {
        e.preventDefault()
        requestConnection({variables: {
            partnerId: partner.user.id} 
        })
    }

    const handleAccept = (e) => {
        e.preventDefault()
        acceptRequestConnection({variables: {
            connectionId: e.target.id} 
        })
    }
    
    const handleRemove = (e) => {
        e.preventDefault()
        if(data.getUserDetails?.email === process.env.REACT_APP_DEMO_MAIL){
            window.alert("This is just a demo! This function is not working here")
        } else {
            deleteConnection({variables: {
                connectionId: partner.connectionId} 
            })
            setPartner('')   
        }
    }

    return (
        <div>
            {requestLoading || acceptLoading || deleteLoading || loading ? (
                <Spinner loading={requestLoading || acceptLoading || deleteLoading || loading} />
            ) : (
                <Container>
                    <h3>Your Profile</h3>
                    {data && <UserCard user={data.getUserDetails} />}
                    {!partner.user ? 
                        <Search setPartner={setPartner} /> 
                        : 
                        <>
                            <h3>Your Connection {partner.status === "pending" && "is pending"}</h3>
                            <PartnerCard user={partner.user} />
                            {(partner.status === "pending" && partner.requester !== user.id) ? 
                            <Button style={{marginTop: "2rem", marginRight: "2rem"}} variant="contained" id={partner.connectionId} onClick={handleAccept}>Accept</Button>
                            : partner.status === "none" ?
                            <Button style={{marginTop: "2rem", marginRight: "2rem"}} variant="contained" onClick={handleRequest}>Request</Button>
                            :
                            ""
                            }
                            <Button style={{marginTop: "2rem"}} variant="contained" color="error" onClick={() => setOpenConfirmation(true)}>Remove</Button>
                            <RemoveConfirmation openConfirmation={openConfirmation} setOpenConfirmation={setOpenConfirmation} handleRemove={handleRemove} />
                        </>
                    }
                </Container>
            ) }
        </div>
    )

}


export default ProfileScreen