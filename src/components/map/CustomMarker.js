import React, { useState } from 'react'
import MemoryModal from './MemoryModal'
import Spinner from '../../components/Spinner'
import { Marker, Popup } from 'react-leaflet'
import { useMutation } from '@apollo/client'
import { Typography, Container, Button} from '@mui/material';
import {DELETE_PLACE} from '../../utils/graphql/mutations'

function CustomMarker({place, mapId, user}) {
    const [openModal, setOpenModal] = useState(false)

    const [deletePlace, {loading}] = useMutation(DELETE_PLACE, {
        onError(err){
            console.log(JSON.stringify(err, null, 2))
        },
        variables: {
            placeId: place.id,
            mapId: mapId
        }
    })

    const deleteHandler = () => {
        if(user.email === process.env.REACT_APP_DEMO_MAIL){
            window.alert("This is just a demo! This function is not working here")
        } else {
            if(window.confirm('Are you sure you want to delete this memory?')){
                deletePlace()
              }
        }
  }

    return (
        <div>
            {openModal && <MemoryModal openModal={openModal} setOpenModal={setOpenModal} place={place} mapId={mapId}/>}
            <Spinner loading={loading} />
            <Marker position={[place.lat, place.long]}>
                <Popup>
                    <Container>
                        <Typography variant="h5" noWrap component="div" mb={2}>
                            Location: {place.city}
                        </Typography>
                        <Typography variant="body1" noWrap component="div" mb={2}>
                            {place.title}
                        </Typography>
                        <Typography variant="body1" wrap="true" component="div" mb={2}>
                            Time: {place.begin} - {place.end} 
                        </Typography>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button type="button" onClick={ ()=> setOpenModal(true) } variant="contained" color="primary">Open</Button>
                            <Button type="button" onClick={ deleteHandler } variant="contained" color="error">Delete</Button>
                        </div>
                    </Container>
                </Popup>
            </Marker>
        </div>
        
    )
}

export default CustomMarker