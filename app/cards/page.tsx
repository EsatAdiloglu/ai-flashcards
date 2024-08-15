"use client"

import { AppBar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import { SetContent } from "@/components/Set";
import SetGrid from "@/components/SetGrid";


export default function CardSet() {
    const [cardSets, setCardSets] = useState<SetContent[]>([])
    const [addSet, setAddSet] = useState(false)
    const [setName, setSetName] = useState("")

    const handleOpen  = () => setAddSet(true)
    const handleClose = () => {
        setSetName("")
        setAddSet(false)
    }

    useEffect(() => {
        const fetchSets = async () => {
        try{
            const response = await fetch("/api/testset")
            const data = await response.json()
            const current_sets: SetContent[] = []
            data.sets.forEach((s: string) => {
                current_sets.push({name: s} )
            }) 
            setCardSets(current_sets)
        }
        catch(error){
            console.error(error)
        }
        }
        fetchSets()
    }, [])

    return (
        <Container maxWidth={false} sx={{width:"100vw", height:"100vh"}} >
            <AppBar position="static" sx={{display:"flex", flexDirection:"row", height:"10%"}}>
                <Typography variant="h2" sx={{flexGrow: 1, ml: "20px"}}>Test</Typography>
                <Button color="inherit" sx={{width:"100px"}}>Sign Out</Button>
            </AppBar>
            <Stack direction="column" spacing={2}>
                <Typography variant="h5" sx={{ml:"20px"}}>Hello User,</Typography>
                <Typography variant="h5" sx={{ml:"20px"}}>Here are your sets:</Typography>
                <Button variant="contained" onClick={handleOpen}><AddIcon />Add Set</Button>
                <Box>
                    {cardSets && 
                     <SetGrid sets={cardSets} />
                    }
                </Box>
            </Stack>

            <Dialog open={addSet} onClose={handleClose} sx={{width:"100%"}}>
                <DialogTitle>Add Set</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your set
                    </DialogContentText>
                    <TextField autoFocus margin="dense" label="Set name" type="text" fullWidth value={setName} onChange={(e) => setSetName(e.target.value)}></TextField>
                </DialogContent>
                <DialogActions>
                        <Button variant="contained">Add</Button>
                        <Button variant="contained" onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}
