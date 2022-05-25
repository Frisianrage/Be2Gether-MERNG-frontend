import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, ...other } = props;
  
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function NoPartnerDialog({history, dialogOpen, setDialogOpen}) {

  const handleClose = () => {
    history.push('/profile')
    setDialogOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={dialogOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          No Partner Found
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            It seems like you don't have a prtner yet here. You need a partner to use this part of Be2Gether.
          </Typography>
          <br />
          <Typography gutterBottom>
            You need to go back to your profile to find your partner so you can fully enjoy Be2Gether.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Go to Profile
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
