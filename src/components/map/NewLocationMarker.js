import React, { useState } from 'react'
import Spinner from '../../components/Spinner'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { Marker, Popup, useMapEvents } from 'react-leaflet'
import {Button} from '@mui/material'
import { CREATE_PLACE } from '../../utils/graphql/mutations'

function NewLocationMarker({ mapId }) {
    const history = useHistory()

    const initialState = {
        lat: "",
        lng: ""
    }

    const [position, setPosition] = useState(initialState)
    
    useMapEvents({
        click(e) {
            if(position.lat !== ""){
            setPosition(initialState)
            } else {
              setPosition(e.latlng)  
            }
        }
    })

    const [createPlace, {loading} ] = useMutation(CREATE_PLACE, {
        onError(err){
          console.log(JSON.stringify(err, null, 2))
        },
        variables: {
            lat: JSON.stringify(position.lat),
            long: JSON.stringify(position.lng),
            mapId
        },
        onCompleted(data){
            const id = data.createPlace.id
            history.push(`/map/${mapId}/places/${id}/edit`)
        }
    })

    const handleClick = () => {
        createPlace()
    }

    return position === null ? null : (
        <>
            <Spinner loading={loading} />
            <Marker position={position} removable editable>
                <Popup>Do you want to create a new Memory?
                    <Button onClick={handleClick}>Yes</Button>
                </Popup>
            </Marker>
        </>
    )
}

export default NewLocationMarker
