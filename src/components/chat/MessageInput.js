import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';
import { useMutation } from '@apollo/client'
import PictureMessageInput from './PictureMessageInput'
import { NEW_MESSAGE } from '../../utils/graphql/mutations'

const MessageInput = ({chatId}) => {
    const [textValue, setTextValue] = useState("")
        
    const updateText = (e) => { 
        e.preventDefault() 
        setTextValue(e.target.value) 
    }
    console.log(chatId)
    const [newMessage] = useMutation(NEW_MESSAGE,{
        onError(err){
            console.log(JSON.stringify(err, null, 2))
        }
    });

    const writeNewMessage = (e) => {
        e.preventDefault();
        newMessage({ 
            variables: { 
                content: textValue,
                messagetype: "text",
                chatId
            } 
        })
     setTextValue('')
    }

    return (
        
            <form onSubmit={writeNewMessage} className="message-input" style={{width: "100%"}}>
               <TextField size="normal" className="text_message" id="outlined-basic" label="Enter new message..." variant="outlined" value={textValue} onChange={updateText} />
               <PictureMessageInput chatId={chatId}/>
               <Button style={{width: "10rem", fontSize: "17px", backgroundColor: "#1976d2"}} variant="contained" type="submit"> Send</Button>
            </form> 
        
    )
}

export default MessageInput