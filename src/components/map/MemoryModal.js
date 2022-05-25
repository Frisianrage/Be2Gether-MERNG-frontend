import React from 'react';
import {Link} from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, ImageList, ImageListItem, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

export default function MemoryModal({openModal, setOpenModal, place}) {
  console.log(place)

  return (
    <div>
      <BootstrapDialog
        onClose={() => setOpenModal(false)}
        aria-labelledby="customized-dialog-title"
        open={openModal}
        fullWidth={true}
        maxWidth="xl"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpenModal(false)}>
          {place.title} (We travelled from {place.begin} until {place.end} to {place.city}/{place.country})
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {place.body} 
          </Typography>
          <Typography style={{paddingTop: "3rem", fontWeight: "bold", fontSize: "1.1rem"}}>
            GALLERY
          </Typography>
          <ImageList variant="masonry" cols={2} gap={8}>
            {place.img.map((image) => (
              <ImageListItem key={image.id}>
                <img
                  src={`${image.file}?w=248&fit=crop&auto=format`}
                  srcSet={`${image.file}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={image.name}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </DialogContent>
        <DialogActions>
            <Button autoFocus>
                <Link to={`/map/place/${place.id}/edit`}  style={{textDecoration: "none", color: "#1976d2"}}>
                        Edit
                </Link>
            </Button>
            <Button autoFocus onClick={() => setOpenModal(false)}>
                Close
            </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
