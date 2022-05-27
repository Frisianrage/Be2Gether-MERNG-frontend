import React, { useContext } from 'react'
import {AuthContext} from '../../context/auth'
import moment from 'moment'
import { getDownloadURL, storage, ref, uploadBytesResumable } from '../../firebase'
import {useMutation} from '@apollo/client'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {NEW_MESSAGE} from '../../utils/graphql/mutations'


const PictureMessageInput = ({chatId}) => {    

    const { user } = useContext(AuthContext)
    
    const [newMessage] = useMutation(NEW_MESSAGE, {
        onError(err){
            console.log(JSON.stringify(err, null, 2))
        }
    });

    const writeNewMessage = async (e) => {
        e.preventDefault()
        const files = e.target.files
        const image = Object.values(files)[0]

        const date = moment().format('L')
        
        const metadata = {
          contentType: 'image/jpeg',
        };

        console.log('start of upload')

        const storageRef = ref(storage, `${user.id}/chat/${date}/${image.name}`)
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
            async (email) => {
                // Upload completed successfully, now we can get the download URL
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                
                console.log('File available at', downloadURL);
                
                newMessage({ 
                    variables: { 
                        content: downloadURL,
                        messagetype: image.type,
                        chatId

                    } 
                })
            } 
        ) 
    }

    const handleClick = () => {
        document.querySelector("div.pic_mess_upload input").click()
    }

    return (
        <div className="pic_message">
            <AddAPhotoIcon fontSize="large" onClick={handleClick}/>
            <div className="pic_mess_upload">
                <input type="file"  multiple={false} onChange={(e) => writeNewMessage(e)} />
            </div>
        </div>
    )
}

export default PictureMessageInput