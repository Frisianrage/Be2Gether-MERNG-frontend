import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function RemoveConfirmation({openConfirmation, setOpenConfirmation, handleRemove}) {

    const handleClose = () => {
        setOpenConfirmation(false)
    }

    const handleAgree = () => {
        handleRemove()
        setOpenConfirmation(false)
    }

    return (
        <Dialog
        open={openConfirmation}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this connection?"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
            You are about to delete your connection. You will delete any data connected to this person, like chat messages, pictures, maps, places, etc. 
            Once you pressed "Delete" these informations will be irretrievable deleted FOR YOU AND YOUR PARTNER!!! so make sure you know what you are doing!!!
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
            NOOOOO!!!
            </Button>
            <Button onClick={handleAgree} color="secondary" autoFocus>
            Yes! Delete!
            </Button>
        </DialogActions>
        </Dialog>
);
}

export default RemoveConfirmation