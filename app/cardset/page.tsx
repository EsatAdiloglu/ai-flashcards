"use client"

import { AppBar, Box, Button, Container, Stack, Typography } from "@mui/material"
import { useState } from "react"
import AddIcon from '@mui/icons-material/Add';


export default function cardSet() {
    const [cardSets, setCardSets] = useState([])

    return (
        <Container maxWidth={false} sx={{width:"100vw", height:"100vh"}} >
            <AppBar position="static" sx={{display:"flex", flexDirection:"row", height:"10%"}}>
                <Typography variant="h2" sx={{flexGrow: 1, ml: "20px"}}>Test</Typography>
                <Button color="inherit" sx={{width:"100px"}}>Sign Out</Button>
            </AppBar>
            <Stack direction="column" spacing={2}>
                <Typography variant="h5" sx={{ml:"20px"}}>Hello User,</Typography>
                <Typography variant="h5" sx={{ml:"20px"}}>Here are your sets:</Typography>
                <Button variant="contained"><AddIcon />Add Set</Button>
            </Stack>
        </Container>
    )
}
