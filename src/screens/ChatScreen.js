import React, { useEffect, useRef, useState} from 'react'
import {useQuery} from '@apollo/client'
import { Container } from '@mui/material';
import Spinner from '../components/Spinner'
import NoPartnerDialog from '../components/NoPartnerDialog'
import MessageInput from '../components/chat/MessageInput'
import TextMessage from '../components/chat/TextMessage'
import PictureMessage from '../components/chat/PictureMessage'
import {GET_CHAT} from '../utils/graphql/queries'
import {NEW_MESSAGE_SUB} from '../utils/graphql/subscriptions'


function ChatScreen({match, history}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    
    const token = localStorage.getItem('jwtToken')

    const chatId = match.params.id
    
    if(!token) {
        history.push('/')
    }

    const messagesEndRef = useRef(null)

    console.log(messagesEndRef.current)

    console.log(messagesEndRef)

    const { loading, data, subscribeToMore } = useQuery(GET_CHAT, {
        onCompleted: (data) => {
            !data.getChat.id && setDialogOpen(true)
            console.log(data)
        },
        onError: (err) => {
            console.log(JSON.stringify(err, null, 2))
            history.push('/404')
        }, variables: {
            chatId
        }
    });

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    },[messagesEndRef, data])

    useEffect(() => {
        subscribeToMore({
            document: NEW_MESSAGE_SUB,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;

              const newMessage = subscriptionData.data.newMessage;
              const updatedList = Object.assign({}, prev, {
                getChat: {
                    chat: {
                        messages:[newMessage, ...prev.getChat.chat.messages]
                    }
                }})
                
              return updatedList 
            }
        })
        
    },[subscribeToMore])

    return (
        <Container>
            {loading ? (
                <Spinner loading={loading} />
            ) : (
                <>
                    <NoPartnerDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} history={history} />
                    <h3>Chat</h3>
                    <div className="chathistory" >
                        <>
                        {data?.getChat?.chat?.messages.map(message =>
                        <li  key={message.id} className={message.user.id === data.getChat.id ? "left chatmessage" : "right chatmessage"}>
                            {(message.messagetype === "text") ?
                                <TextMessage message={message} userId={data.getChat.id} />
                              :
                                <PictureMessage message={message} userId={data.getChat.id} />    
                            }
                        </li> 
                        
                       
                        )}
                        <div ref={messagesEndRef} />
                        </>
                    </div>
                    {data && data.getChat && 
                        <div>
                            <MessageInput /> 
                        </div>
                    }
                </>
            )}
        </Container>
    )
}


export default ChatScreen