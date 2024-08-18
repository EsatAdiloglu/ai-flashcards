"use client"

import { AppBar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import Set, { SetContent } from "@/components/Set";
import List from "@/components/List";
import {db} from "@/firebase"
import {collection, doc, getDoc, writeBatch} from "firebase/firestore"

export default function CardSet() {
    const [cardSets, setCardSets] = useState<SetContent[]>([])
    const [newSet, setNewSet] = useState(false)
    const [setName, setSetName] = useState("")

    const handleOpen  = () => setNewSet(true)
    const handleClose = () => {
        setSetName("")
        setNewSet(false)
    }

    useEffect(() => {
        updateSets()
    }, []);

    const sets = cardSets.map(({ id, name }, idx) => {
        return (
            <Set key={idx} id={id} name={name} onChange={() => updateSets()}/>
        );
    })

    const updateSets = async () => {
      try {
        const res = await fetch('/api/sets');
        const sets = await res.json() as SetContent[]
        setCardSets(sets);
      }
      catch(error){
        console.error(error)
      }
    }

    const addSet = async () => {
      try {
        if(setName.replace(/\s/g,"") === ""){
          throw Error("Error: invalid set name");
        }
        
        const response = await fetch('api/sets', {
          method: 'POST',
          body: JSON.stringify({ name: setName })
        });

        //Incase if the user tries to put the name for a set that already exists
        if(response.status === 400){
          alert("Set already exists")
        }
        // TODO: Optimize
        await updateSets();

      } catch(error){
        console.error(error);
      }  
    }

    return (
        <Container maxWidth="xl">
            <Stack direction="column" spacing={2}>
                <Typography variant="h5" sx={{ml:"20px"}}>Hello User,</Typography>
                <Typography variant="h5" sx={{ml:"20px"}}>Here are your sets:</Typography>
                <Button variant="contained" onClick={handleOpen}><AddIcon />Add Set</Button>
                <Box>
                    { 
                        cardSets.length > 0 
                        ? <List>{ sets }</List>
                        : <Typography variant='body1'>No sets to show</Typography>
                    }
                </Box>
            </Stack>

            <Dialog open={newSet} onClose={handleClose} sx={{width:"100%"}}>
                <DialogTitle>Add Set</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your set
                    </DialogContentText>
                    <TextField autoFocus margin="dense" label="Set name" type="text" fullWidth value={setName} onChange={(e) => setSetName(e.target.value)}></TextField>
                </DialogContent>
                <DialogActions>
                        <Button variant="contained" 
                        onClick={() => {
                          addSet()
                          handleClose()
                        }}>Add</Button>
                        <Button variant="contained" onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}
