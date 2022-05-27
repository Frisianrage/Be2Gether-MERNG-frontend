import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { MapContainer, TileLayer} from 'react-leaflet'
import L from 'leaflet';
import {GET_MAP} from '../utils/graphql/queries'
import {NEW_PLACE_SUB} from '../utils/graphql/subscriptions'
import Spinner from '../components/Spinner'
import NoPartnerDialog from '../components/NoPartnerDialog'
import CustomMarker from '../components/map/CustomMarker'
import NewLocationMarker from '../components/map/NewLocationMarker'
import iconUrl from '../../node_modules/leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from '../../node_modules/leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from '../../node_modules/leaflet/dist/images/marker-shadow.png'
import "leaflet-control-geocoder/dist/Control.Geocoder.js";


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl
});

function MapScreen({history, match}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const centerpos = [53.36745, 7.20778] 

    const mapId = match.params.id

    const token = localStorage.getItem('jwtToken')
    
    if(!token) {
        history.push('/')
    }

    const { loading, data, subscribeToMore } = useQuery(GET_MAP, {
        onCompleted: () => {
            !data.getMap.id && setDialogOpen(true)
        },
        onError: (err) => {
            console.log(JSON.stringify(err, null, 2))
            history.push('/404')
        },
        variables: {
            mapId
        }
    })

    useEffect(() => {
        subscribeToMore({
            document: NEW_PLACE_SUB,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;

                const newPlace = subscriptionData.data.newPlace;
                const updatedList = Object.assign({}, prev, {
                    getMap: {
                            places:[newPlace, ...prev.getMap.places]
                    }
                })
                
              return updatedList 
            }
        })
    },[subscribeToMore])
 

    return (
        <>
        {loading ? (
            <Spinner loading={loading} />
            ) : (
            <>
                <NoPartnerDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} history={history} />
                <h3 style={{marginLeft: "5rem"}}>Map</h3>
                <MapContainer  className="mapcontainer" center={centerpos} zoom={5}>
                    <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/> 
                    {data?.getMap?.places?.map(place => (
                        <div key={place.id}>
                           <CustomMarker place={place} mapId={mapId} /> 
                        </div>
                    ))}
                    <NewLocationMarker mapId={mapId} />
                </MapContainer>
            </>)
        }
        </>
    )
}


export default MapScreen