import React from 'react'
import { Avatar, Container,Typography, Box} from '@mui/material';

function PartnerCard({user}) {
    console.log(user)
    return (
        <div className="card-3">
            <Container style={{display: 'flex', justifyContent: 'space-between', padding: '1rem'}}>
                    <Box style={{margin: 'auto 0'}}>
                    <Typography sx={{fontSize: '20px', fontWeight: 'bold'}}>{user.firstname} {user.lastname}</Typography>
                </Box>
                <Box style={{margin: 'auto 0'}}>
                  <Avatar sx={{ width: 100, height: 100 }} src={user.avatar.file} />  
                </Box>
            </Container> 
        </div>
    )
}

export default PartnerCard