"use client"

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { usePathname, useRouter } from "next/navigation"
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

type Options = {
    name: string,
}

export type SetContent = Options

const STYLING = {
    position:"relative",
    border:"2px solid black",
    borderRadius:"1rem",
    width:"80%", 
    height: "125px", 
    mb: 2,
    "&:hover": {
        backgroundColor:"#cdcccd"
    },
    "&:hover .icon-button":{
        zIndex: 1
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent', // Same as default background
        zIndex: 0, // Behind the content
      },
}


export default function Set({
    name
}: Options){
    const router = useRouter()
    const pathname= usePathname()

    const handleClick = (name: string) => {
        router.push(`${pathname}/${name}`);
    }

    const deleteSet = async (name: string) => { 
    try{
        const response = await fetch("/api/sets", {
            method: "POST",
            body: JSON.stringify({name: name, type: "deleteSet"})
        })
        if(response.ok){
            console.log("success")
        }
    }
    catch(error){
        console.error(error)
    }
    }

    return (
        <Box>
        <Box component="button" 
            sx={ STYLING }
            onClick={() => handleClick(name)} >
            
            <Typography>{name}</Typography>
            
        </Box>
        <IconButton
         onClick={() => deleteSet(name)}><DeleteIcon /></IconButton>
        </Box>
    )
}