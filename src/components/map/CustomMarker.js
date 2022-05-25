import React, { useState } from 'react'
import MemoryModal from './MemoryModal'
import Spinner from '../../components/Spinner'
import { Marker, Popup } from 'react-leaflet'
import { useMutation } from '@apollo/client'
import { Typography, Container, Button} from '@mui/material';
import {DELETE_PLACE} from '../../utils/graphql/mutations'

function CustomMarker({place, mapId}) {
    const [openModal, setOpenModal] = useState(false)

    const [deletePlace, {loading}] = useMutation(DELETE_PLACE, {
        onError(err){
            console.log(err)
        },
        variables: {
            placeId: place.id,
            mapId: mapId
        }
    })

    const deleteHandler = () => {
    if(window.confirm('Are you sure you want to delete this memory?')){
      deletePlace()
    }
  }

    return (
        <div>
            {openModal && <MemoryModal openModal={openModal} setOpenModal={setOpenModal} place={place} />}
            <Spinner loading={loading} />
            <Marker position={[place.lat, place.long]}>
                <Popup>
                    <Container>
                        <Typography variant="h6" noWrap component="div" mb={2}>
                            Location: {place.city}/{place.country}
                        </Typography>
                        <Typography variant="body2" wrap="true" component="div" mb={2}>
                            Time: {place.begin} until {place.end} 
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