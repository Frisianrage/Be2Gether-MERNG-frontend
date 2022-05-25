import React, { useContext, useEffect, useRef, useState } from 'react';
import Spinner from '../../components/Spinner'
import { getDownloadURL, storage, ref, uploadBytesResumable, deleteObject } from '../../firebase'
import {AuthContext} from '../../context/auth'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, ImageList, ImageListItem, ImageListItemBar, IconButton } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useMutation, useQuery } from '@apollo/client'
import { GET_PLACE_IMAGES } from '../../utils/graphql/queries'
import { ADD_PLACE_IMG, DELETE_PLACE_IMG } from '../../utils/graphql/mutations'


export default function PlaceImageModal({ placeId, openModal, setOpenModal}) {
  const { user } = useContext(AuthContext)

  const [images, setImages] = useState([])

  //Fetching the place images from the database

  const { loading, data, refetch } = useQuery(GET_PLACE_IMAGES, {
    variables: {
      id: placeId
    },
    fetchPolicy: 'network-only',
    onError(err){
      console.log(JSON.stringify(err, null, 2))
    },
    onCompleted(){
      console.log('done')
      setImages(data.getPlaceImages)
    }
  })

  useEffect(() => {
    if(data){
      setImages(data.getPlaceImages)
    }
  },[data])


  // Uploading photos to the storage and adding them to the database

  const handleClick = () => {
    document.querySelector("div.pic_mess_upload input").click()
  }

  const [addPlaceImg, {addloading} ] = useMutation(ADD_PLACE_IMG, {
    onError(err){
      console.log(JSON.stringify(err, null, 2))
    },
    onCompleted(){
      console.log('refetching')
      refetch()
    }
  })

  const addPhotos = async (e) => {
    e.preventDefault()
    const {files} = document.querySelector('#file_upload')
    const uploadedImages = Object.values(files)
    
    const metadata = {
      contentType: 'image/jpeg',
    };
    
    
    uploadedImages.forEach(image => {
      console.log('start of upload')

      const storageRef = ref(storage, `${user.id}/places/${placeId}/${image.name}`)
      const uploadTask = uploadBytesResumable(storageRef, image, metadata);
      
      //initiates the firebase side uploading 
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              (console.log(snapshot))
          }
        }, 
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              console.log("User doesn't have permission to access the object")
              break;
            case 'storage/canceled':
              console.log("User canceled the upload")
              break;
            case 'storage/unknown':
              console.log("Unknown error occurred, inspect error.serverResponse ")
              console.log(error.serverResponse)
              break;
            default:
              console.log(error)
          }
        }, 
        async () => {
          // Upload completed successfully, now we can get the download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          
          console.log('File available at', downloadURL);

          const newImg = {
            file: downloadURL,
            type: image.type,
            name: image.name,
            size: JSON.stringify(image.size)
          } 
          addPlaceImg({variables: {img: newImg, placeId: placeId}})
        }
        
      ) 
    })
  }


  // Delete a photo from the storage and from the database

  const [deletePlaceImg, {deleteloading} ] = useMutation(DELETE_PLACE_IMG, {
    onError(err){
      console.log(JSON.stringify(err, null, 2))
    },
    onCompleted(){
      refetch()
    }
  })

  const deletePhoto = (e) => {
    const imageId = e.target.id
    const imageName = e.target.parentElement.title

    //deleting the image from firebase/storage
    const desertRef = ref(storage, `${user.id}/places/${placeId}/${imageName}`);

    deleteObject(desertRef).then(() => {
      // File deleted successfully
      console.log('File deleted')
    }).catch((error) => {
      console.log(error)
      // Uh-oh, an error occurred!
    });
    deletePlaceImg({variables: {imgId: imageId, placeId: placeId}})    
  }

  
  const descriptionElementRef = useRef(null);
  
  useEffect(() => {
    if (openModal
      ) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openModal]);



  const handleClose = () => {
    setOpenModal(false)
  }

  return (
    <>
    <Spinner loading={loading || addloading || deleteloading} />
    <Dialog
        open={openModal}
        onClose={handleClose}
        scroll={'paper'}
        fullWidth={true}
        maxWidth={'lg'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <div id="title" style={{display: "flex", justifyContent: "space-around"}}>
          <DialogTitle id="scroll-dialog-title" style={{fontSize: "30px", fontWeight: "bold"}}>Gallery</DialogTitle>
          <DialogTitle>
            <AddAPhotoIcon fontSize="large" onClick={handleClick}/>
              <div className="pic_mess_upload">
                  <Input type="file" id="file_upload"  inputProps={{ multiple: true }} onChange={(e) => addPhotos(e)} />
              </div>
          </DialogTitle>
        </div>
        <DialogContent dividers={true} ref={descriptionElementRef} tabIndex={-1}>
          <ImageList variant="masonry" cols={2} gap={8}>
            {images && images.map((item) => (
              <ImageListItem key={item.name}>
                <img
                  src={item.file}
                  srcSet={item.file}
                  alt={item.name}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.name}
                  subtitle={item.size}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${item.name}`}
                      onClick={e => deletePhoto(e)} 
                      title={item.name}
                    >
                      <HighlightOffIcon id={item.id} />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      </>
  );
}