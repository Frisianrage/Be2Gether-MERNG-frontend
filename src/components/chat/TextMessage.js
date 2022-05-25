import React from 'react'
import { Typography } from '@mui/material';
import moment from 'moment'

function TextMessage({message, userId}) {
    return (
        <div className={message.user.id === userId ? "usermessage" : "partnermessage"}>
            <Typography className="messagebody">{message.content}</Typography>
            <small className="timestamp">{moment.parseZone(message.createdAt).local().format("LT")}</small>
        </div>
    )
}

export default TextMessage
