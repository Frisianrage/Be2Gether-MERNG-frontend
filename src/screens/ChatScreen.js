import React, { useContext, useEffect, useRef, useState} from 'react'
import {useQuery} from '@apollo/client'
import { Container } from '@mui/material';
import Spinner from '../components/Spinner'
import NoPartnerDialog from '../components/NoPartnerDialog'
import MessageInput from '../components/chat/MessageInput'
import TextMessage from '../components/chat/TextMessage'
import PictureMessage from '../components/chat/PictureMessage'
import {GET_CHAT} from '../utils/graphql/queries'
import {NEW_MESSAGE_SUB} from '../utils/graphql/subscriptions'
import {AuthContext} from '../context/auth'


function ChatScreen({match, history}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { user } = useContext(AuthContext)
    
    const token = localStorage.getItem('jwtToken')

    const chatId = match.params.id
    
    if(!token) {
        history.push('/')
    }

    const messagesEndRef = useRef(null)

    const { loading, data, subscribeToMore } = useQuery(GET_CHAT, {
        onCompleted: (data) => {
            !data.getChat.id && setDialogOpen(true)
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
                        messages:[newMessage, ...prev.getChat.messages]
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
                        {data?.getChat?.messages.map(message =>
                        <li  key={message.id} className={message.user.id === user.id ? "left chatmessage" : "right chatmessage"}>
                            {(message.messagetype === "text") ?
                                <TextMessage message={message} userId={user.id} />
                              :
                                <PictureMessage message={message} userId={user.id} />    
                            }
                        </li> 
                        
                       
                        )}
                        <div ref={messagesEndRef} />
                        </>
                    </div>
                    {data && data.getChat && 
                        <div>
                            <MessageInput chatId={chatId}/> 
                        </div>
                    }
                </>
            )}
        </Container>
    )
}


export default ChatScreen