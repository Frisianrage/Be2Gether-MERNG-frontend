import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import PlaceImageModal from '../components/map/PlaceImageModal'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Container, CssBaseline, FormControl, Grid, TextField, Typography } from '@mui/material';
import { GET_PLACE } from '../utils/graphql/queries'
import { UPDATE_PLACE } from '../utils/graphql/mutations'
import Spinner from '../components/Spinner'

const initialState =  {
    body: "",
    title: "",
    city: "",
    address: "",
    country: "",
    zip: "",
    img: [],
    begin: "",
    end: ""
  }

  const style = {
    m: 3,
    width: 75,
    height: 35,
    fontSize: 16
  };


function EditMemoryScreen({match}) {
    const id = match.params.id
    const history = useHistory()

    const [place, setPlace] = useState(initialState)
    const [openModal, setOpenModal] = useState(false)

    const onChange = (event) => {
        setPlace({...place, [event.target.id] : event.target.value})
    }
    
    const {loading, data} = useQuery(GET_PLACE, {
        onError(err){
            console.log(JSON.stringify(err, null, 2))
        },
        variables: {
            id: id
        },
        onCompleted(){
            setPlace(data.getPlace)
        }
    })

    const [updatePlace, {loading: updateLoading} ] = useMutation(UPDATE_PLACE, {
        onError(err){
            console.log(JSON.stringify(err, null, 2))
        },
        variables: {
            id: place.id,
            body: place.body,
            title: place.title,
            city: place.city,
            address: place.address,
            country: place.country,
            zip: place.zip,
            begin: place.begin,
            end: place.end
        }
    })

    const onSubmit = (e) => {
        e.preventDefault()
        updatePlace()
    }

    const handleClose = () => {
        history.push("/map")
    }
    
    return (
        <Container component="main">
          <Spinner loading={loading || updateLoading} />
          <PlaceImageModal placeId={place.id} openModal={openModal} setOpenModal={setOpenModal} />
          <>
            <div style={{display: "flex", justifyContent: "space-between", paddingTop: "2rem"}}>
                <Typography component="h1" variant="h5" style={{fontWeight: 'bold', fontSize: '28px', width: "75%"}}>
                    Edit your memory
                </Typography>
                <Typography onClick={() => setOpenModal(true)} component="h1" variant="h5" style={{cursor: "pointer", fontWeight: 'bold', fontSize: '28px', width: "75%"}}>
                    Gallery
                </Typography>
            </div>
            <CssBaseline />
            <FormControl noValidate onSubmit={onSubmit}>
              <Grid container spacing={2} style={{marginTop: '1rem'}}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoComplete="title"
                        value={place.title} 
                        onChange={onChange}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="address"
                    name="address"
                    variant="outlined"
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    autoFocus
                    value={place.address} 
                    onChange={onChange}
                  />
                </Grid>
                    <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="city"
                    name="city"
                    variant="outlined"
                    required
                    fullWidth
                    id="city"
                    label="City"
                    autoFocus
                    value={place.city} 
                    onChange={onChange}
                  />
                </Grid><Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="country"
                    name="country"
                    variant="outlined"
                    required
                    fullWidth
                    id="country"
                    label="Country"
                    autoFocus
                    value={place.country} 
                    onChange={onChange}
                  />
                </Grid><Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="zip"
                    name="zip"
                    variant="outlined"
                    required
                    fullWidth
                    id="zip"
                    label="Zip Code"
                    autoFocus
                    value={place.zip} 
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="begin"
                    name="begin"
                    variant="outlined"
                    required
                    fullWidth
                    id="begin"
                    label="Begin"
                    autoFocus
                    type="date"
                    value={place.begin} 
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="end"
                    label="End"
                    name="end"
                    type="date"
                    autoComplete="end"
                    value={place.end} 
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={{overflowY: "scroll", height: "400px"}}
                    variant="outlined"
                    required
                    fullWidth
                    multiline
                    minRows="6"
                    id="body"
                    label="Memory"
                    name="body"
                    value={place.body} 
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} style={{textAlign: 'center'}}>
                  <Button sx={style} type="submit" variant="contained" color="primary" onClick={onSubmit}>
                    Save
                  </Button>
                  <Button
                    sx={style}
                    type="button"
                    onClick={handleClose}
                    variant="contained"
                    color="error"
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </>
        </Container>
      );
}

export default EditMemoryScreen
