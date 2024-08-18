"use client"

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { usePathname, useRouter } from "next/navigation"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material';
import { useState } from 'react';

type Options = {
    name: string,
    id: string,
    onChange: (() => void) | (() => Promise<void>)
}

export type SetContent = Options

const STYLING = {
    position:"relative",
    border:"2px solid black",
    borderRadius:"1rem",
    width:"80%", 
    height: "125px", 
    mb: 2,
    zIndex: 1,
    "&:hover": {
        cursor: "pointer",
        border: "4px solid black"
    },
    '&:hover .icon-button': {
        backgroundColor: 'lightblue',
    },
}
const EDITSTYLING = {
    position: "absolute",
    right: "15%",
    bottom: "0",
    "&:hover":{
        backgroundColor: "#c6c5c6"
    }
}
const DELETESTYLING = {
    position: "absolute",
    right: "0",
    bottom: "0",
    "&:hover":{
        backgroundColor: "#c6c5c6"
    }
}


export default function Set({
    name, id, onChange
}: Options){
    const [open, setOpen] = useState(false)
    const [newName, setNewName] = useState("")
    const router = useRouter()
    const pathname= usePathname()

    const apiURL = `api/sets/${id}`;

    const handleOpen = (event: any) => {
        event.stopPropagation();
        setOpen(true)
    }

    const handleClose = () => {
        setNewName("")
        setOpen(false)
    }
    const handleClick = (_name: string) => {
        router.push(`${pathname}/${id}`);
    }

    const deleteSet = async (name: string, event:any) => { 
    try{
        event.stopPropagation();
        
        await fetch(apiURL, {
            method: "DELETE",
            //body: JSON.stringify({name: name, type: "deleteSet", new: newName})
        })
        await onChange()
    }
    catch(error){
        console.error(error)
    }
    }

    const editSet = async (name: string) => {
        try{
            if(newName.replace(/\s/g,"") === ""){
                throw Error("Error: invalid set name");
            }
            const response  = await fetch(apiURL, {
                method: "PUT",
                body: JSON.stringify({ name: newName })
            })
            if(response.status === 400){
                alert("Name already exists for a different set. Please choose another name.")
            }
            else{
                await onChange()
            }

        }
        catch(error){
            console.error(error)
        }
    }

    return (
        <Box>
        <Box 
            sx={ STYLING }
            onClick={() => handleClick(name)} >
            <Typography sx={{position:"absolute",top:"50%",left:"50%", transform: "translate(-50%,-50%)"}}>{name}</Typography>
            <IconButton sx= { EDITSTYLING } onClick={(event) => handleOpen(event)}><EditIcon /></IconButton>
            <IconButton sx= { DELETESTYLING } onClick={(event) => deleteSet(name,event)}><DeleteIcon /></IconButton>
        </Box>

        <Dialog open={open} onClose={handleClose} sx={{width:"100%"}}>
                <DialogTitle>Edit Set</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a new name for {name}
                    </DialogContentText>
                    <TextField autoFocus margin="dense" label="Set name" type="text" fullWidth value={newName} onChange={(e) => setNewName(e.target.value)}></TextField>
                </DialogContent>
                <DialogActions>
                        <Button variant="contained" 
                        onClick={() => {
                          editSet(name)
                          handleClose()
                        }}>Change</Button>
                        <Button variant="contained" onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}