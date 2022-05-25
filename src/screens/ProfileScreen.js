import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Container } from '@mui/material';
import Spinner from '../components/Spinner'
import UserCard from '../components/profile/UserCard'
import PartnerCard from '../components/profile/PartnerCard'
import Search from '../components/profile/Search'
import RemoveConfirmation from '../components/profile/RemoveConfirmation'
import { ACCEPT_REQUEST_CONNECTION, CREATE_CHAT, DELETE_CONNECTION, REQUEST_CONNECTION, CREATE_MAP } from '../utils/graphql/mutations'
import { GET_USER_DETAILS } from '../utils/graphql/queries'

function ProfileScreen({history}) {
    const [partner, setPartner] = useState('')
    const [openConfirmation, setOpenConfirmation] = useState(false);

    const { loading, data } = useQuery(GET_USER_DETAILS, {
        onCompleted: () => {
            console.log(data)
        },
        onError: (e) => {
            console.log({e})
            history.push('/404')
        }     
    })

    useEffect(()=>{
        if(data?.getUserDetails.partner.user){
            setPartner(data.getUserDetails.partner)
        }
    },[data, setPartner])

    const [requestConnection, {loading: requestLoading}] = useMutation(REQUEST_CONNECTION,{
        refetchQueries: [
            {
                query: GET_USER_DETAILS
            }
          ]
    })

    const [acceptRequestConnection, {loading: acceptLoading}] = useMutation(ACCEPT_REQUEST_CONNECTION,{
        refetchQueries: [
            {
                query: GET_USER_DETAILS
            }
          ]
    })

    const [deleteConnection, {loading: deleteLoading}] = useMutation(DELETE_CONNECTION,{
        refetchQueries: [
            {
                query: GET_USER_DETAILS
            }
          ]
    })

    const [createChat, {loading: chatLoading}] = useMutation(CREATE_CHAT,{
        refetchQueries: [
            {
                query: GET_USER_DETAILS
            }
          ]
    })

    const [createMap, {loading: mapLoading}] = useMutation(CREATE_MAP,{
        refetchQueries: [
            {
                query: GET_USER_DETAILS
            }
          ]
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
            partnerId: partner.user.id} 
        })
        createChat({variables: {
            partnerId: partner.user.id} 
        })
        createMap({variables: {
            partnerId: partner.user.id} 
        })
    }

    const handleRemove = (e) => {
        e.preventDefault()
        deleteConnection({variables: {
            partnerId: partner.user.id} 
        })
        setPartner('')
    }

    return (
        <div>
            {mapLoading ||requestLoading || acceptLoading || deleteLoading || chatLoading || loading ? (
                <Spinner loading={mapLoading ||requestLoading || acceptLoading || deleteLoading || chatLoading || loading} />
            ) : (
                <Container>
                    <h3>Your Profile</h3>
                    {data && <UserCard user={data.getUserDetails} />}
                    {!partner.user ? 
                        <Search setPartner={setPartner} /> 
                        : 
                        <>
                            <h3>Your Connection</h3>
                            <PartnerCard user={partner.user} />
                            {partner.status === "pending" ? 
                            <Button variant="contained" onClick={handleAccept}>Accept</Button>
                            : partner.status === "none" ?
                            <Button variant="contained" onClick={handleRequest}>Request</Button>
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