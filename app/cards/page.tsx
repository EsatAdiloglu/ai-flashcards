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
        // const fetchSets = async () => {
        // try{
        //     const response = await fetch("/api/testset")
        //     const data = await response.json()
        //     const current_sets: SetContent[] = []
        //     data.sets.forEach((s: string) => {
        //         current_sets.push({name: s} )
        //     }) 
        //     setCardSets(current_sets)
        // }
        // catch(error){
        //     console.error(error)
        // }
        // }
        // fetchSets()
        updateSets()
    }, []);

    const sets = cardSets.map(({ name }, idx) => {
        return (
            <Set key={idx} name={name}/>
        );
    })

    const updateSets = async () => {
      try{
        const userDocRef = doc(collection(db,"users"),"test")
        const docSnap = await getDoc(userDocRef)
        if (docSnap.exists()) {
          const setCollection: string[] = docSnap.data().sets || []
          const current_sets: SetContent[] = []
          setCollection.forEach((f: string) => {
            current_sets.push({name: f})
          })
          setCardSets(current_sets)
        }
        else{
          setCardSets([])
        }
      }
      catch(error){
        console.error(error)
      }
    }

    const addSet = async () => {
      try{
        if(setName.replace(/\s/g,"") === ""){
          alert("Error: invalid set name")
          return
        }
        const batch = writeBatch(db)
        const userDocRef = doc(collection(db,"users"),"test")
        const docSnap = await getDoc(userDocRef)

        if (docSnap.exists()){
          const setCollection: string[] = docSnap.data().sets || []
          if (setCollection.find((f: string) => f === setName)){
            alert("Set already exists")
            return
          }
          else{
            setCollection.push(setName)
            batch.set(userDocRef, {sets: setCollection}, {merge: true})
          }
        }
        else{
            batch.set(userDocRef, {sets: [setName]})
        }
        await batch.commit()
        await updateSets()

      }
      catch(error){
        console.error(error)
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
