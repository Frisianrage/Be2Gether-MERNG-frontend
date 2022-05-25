import React from 'react'
import { Backdrop, CircularProgress }from '@mui/material';


function Spinner({loading}) {
    
    
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Spinner