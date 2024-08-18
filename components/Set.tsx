"use client"

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { usePathname, useRouter } from "next/navigation"
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';

type Options = {
    name: string,
    onDelete: (() => void) | (() => Promise<void>)
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
        backgroundColor:"#cdcccd",
        cursor: "pointer"
    },
    "& > iconButton:hover": {
        border: "1px solid green"
    }
}

const BUTTONSTYLING = {
    position: "absolute",
    right: "0",
    bottom: "0",
    zIndex: 2,
    "&:hover":{
        zIndex: 2,
    }
}


export default function Set({
    name, onDelete
}: Options){
    const router = useRouter()
    const pathname= usePathname()

    const handleClick = (name: string) => {
        router.push(`${pathname}/${name}`);
    }

    const deleteSet = async (name: string, event:any) => { 
    try{
        event.stopPropagation();
        await fetch("/api/sets", {
            method: "POST",
            body: JSON.stringify({name: name, type: "deleteSet"})
        })
        await onDelete()
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
            <Box>
            <IconButton sx= { BUTTONSTYLING } onClick={(event) => deleteSet(name,event)}><DeleteIcon /></IconButton>
            </Box>
        </Box>
        
        </Box>
    )
}