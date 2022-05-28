import React from 'react'
import { Link } from 'react-router-dom'
import {Container, Typography} from '@mui/material';

function PageNotFound() {
    return (
        <Container>
            <div style={{display: "flex", flexDirection: "column", textAlign: "center", marginTop: "5rem"}}>
                <Typography variant="h2">😮</Typography>
                <Typography variant="h3" style={{marginBottom: "2rem"}}>Oops! Page Not Be Found</Typography>
                <Typography variant="h5" style={{marginBottom: "2rem"}}>Sorry but the Typographyage you are looking for does not exist.</Typography>
                <Link to={'/'} >
                    <Typography variant='h6'>
                    Back to homepage   
                    </Typography>
                </Link>
            </div>
        </Container>
    )
}

export default PageNotFound
