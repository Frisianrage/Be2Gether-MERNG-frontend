import React, { useState } from 'react'
import PictureModal from './PictureModal'
import moment from 'moment'

function PictureMessage({message, userId}) {
    const [openModal, setOpenModal] = useState(false);

    const handleClick = () => {
        setOpenModal(true)
        console.log("Here comes the picture in big!!!")
    }
    
    return (
        <>
        <PictureModal img={message} openModal={openModal} setOpenModal={setOpenModal} />
        <div>
            <img onClick={handleClick} id={message.user.id} className={message.user.id === userId ? "picme" : "picyou"} src={message.content} alt="Something is wrong" ></img>
            <small className="timestamp">{moment.parseZone(message.createdAt).local().format("LT")}</small>
        </div>
        </>
        
    )
}

export default PictureMessage
