import React, { useState } from 'react'
import { getDownloadURL, storage, ref, uploadBytesResumable } from '../../firebase'
import { useMutation } from '@apollo/client'
import { Avatar, Box, Button, Container, TextField} from '@mui/material';
import { UPDATE_USER, UPDATE_USER_AVATAR } from '../../utils/graphql/mutations'
import Spinner from '../Spinner'

function UserCard({user}) {
    console.log(user)
    const [avatar, setAvatar] = useState(user.avatar)
    const [firstName, setFirstName] = useState(user.firstname)
    const [lastName, setLastName] = useState(user.lastname)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [toggleDisable, setToggleDisable] = useState(true)

    const editProfile = () => {
        if(user.email === process.env.REACT_APP_DEMO_MAIL){
            window.alert("This is just a demo! This function is not working here")
        } else {
         setToggleDisable(!toggleDisable)   
        }
    }

    const [updateUser, {loading} ] = useMutation(UPDATE_USER, {
        onError(err){
            console.log(JSON.stringify(err, null, 2))
        },
        variables: {
            firstname: firstName,
            lastname: lastName,
            email,
            password,
            confirmPassword,
        },
        onCompleted(){
            setPassword('')
            setConfirmPassword('')
            editProfile()
        }
    })

    const [updateAvatar, {loading: avatarLoading} ] = useMutation(UPDATE_USER_AVATAR,{
        onError(err){
            console.log(JSON.stringify(err, null, 2))
        },
        onCompleted(data){
            setAvatar(data.updateAvatar.avatar)
        }
    })

    const saveChanges = (e) => {
        e.preventDefault()
        updateUser()
    }

    const newAvatar = () => {
       document.querySelector("div.avatar input").click()
    }

    const addAvatar = async (e) => {
        e.preventDefault()
        const files = e.target.files
        const avatar = Object.values(files)[0]
        
        const metadata = {
          contentType: 'image/jpeg',
        };
    
        console.log('start of upload')

        const storageRef = ref(storage, `${user.id}/profile/avatar/Avatar.jpg`)
        const uploadTask = uploadBytesResumable(storageRef, avatar, metadata);
          
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
            async (email) => {
                // Upload completed successfully, now we can get the download URL
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                
                console.log('File available at', downloadURL);
                
                updateAvatar({ 
                    variables: {
                        email: user.email,
                        name: avatar.name,
                        file: downloadURL,
                        type: avatar.type,
                        size:JSON.stringify(avatar.size)
                    }
                })
            } 
        ) 
    }


    return (
        <div className="card-3">
            <Spinner loading={loading || avatarLoading} />
            <Container style={{display: 'flex', justifyContent: 'space-between', padding: '2rem'}}>
                <Box>
                    <h4>Details</h4>
                    <TextField
                    style={{paddingRight: "1rem"}}
                    disabled={toggleDisable}
                    required
                    label="Firstname"
                    defaultValue={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                    style={{paddingRight: "1rem"}}
                    disabled={toggleDisable}
                    required
                    label="Lastname"
                    defaultValue={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                    style={{paddingRight: "1rem"}}
                    disabled={toggleDisable}
                    required
                    label="E-Mail"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <h4>Change Password</h4>
                    <TextField
                    type="password"
                    style={{paddingRight: "1rem"}}
                    disabled={toggleDisable}
                    required
                    label="Password"
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                    type="password"
                    style={{paddingRight: "1rem"}}
                    disabled={toggleDisable}
                    required
                    label="Confirm Password"
                    defaultValue={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Box>
                <Box style={{margin: 'auto 0'}}>
                    <Button color='primary' onClick={editProfile}>Edit</Button>
                    <Button color='primary' onClick={saveChanges}>Save</Button>
                    <div className="avatar" style={{display: "none"}}>
                        <input  type="file" multiple={false} onChange={(e) => addAvatar(e)} />
                    </div> 
                    <Avatar className="avatar" sx={{ width: 150, height: 150 }} src={avatar.file} onClick={newAvatar}/>  
                </Box>
            </Container>      
        </div>
    )
}

export default UserCard
