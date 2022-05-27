import React, { useState } from 'react'
import Spinner from '../../components/Spinner'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { Marker, Popup, useMapEvents } from 'react-leaflet'
import {Button} from '@mui/material'
import { CREATE_PLACE } from '../../utils/graphql/mutations'

function NewLocationMarker({ mapId, user }) {
    const history = useHistory()

    const [position, setPosition] = useState(null)
    
    useMapEvents({
        click(e) {
            if(position !== null){
            setPosition(null)
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
            lat: JSON.stringify(position?.lat),
            long: JSON.stringify(position?.lng),
            mapId
        },
        onCompleted(data){
            const id = data.createPlace.id
            history.push(`/map/${mapId}/places/${id}/edit`)
        }
    })

    const handleClick = () => {
        if(user.email === process.env.REACT_APP_DEMO_MAIL){
            window.alert("This is just a demo! This function is not working here")
        } else {
            createPlace()
        }
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
