import React from 'react'
import { Avatar, Container,TextField, Box} from '@mui/material';

function PartnerCard({user}) {
    
    return (
        <div className="card-3">
            <Container style={{display: 'flex', justifyContent: 'space-between', padding: '1rem'}}>
                <Box style={{margin: 'auto 0'}}>
                <TextField
                    style={{paddingRight: "1rem"}}
                    disabled={true}
                    required
                    label="Firstname"
                    defaultValue={user.firstname}
                    />
                    <TextField
                    style={{paddingRight: "1rem"}}
                    disabled={true}
                    required
                    label="Lastname"
                    defaultValue={user.lastname}
                    />
                    <TextField
                    style={{paddingRight: "1rem"}}
                    disabled={true}
                    required
                    label="E-Mail"
                    defaultValue={user.email}
                    />
                </Box>
                <Box style={{margin: 'auto 0'}}>
                  <Avatar sx={{ width: 100, height: 100 }} src={user.avatar.file} />  
                </Box>
            </Container> 
        </div>
    )
}

export default PartnerCard