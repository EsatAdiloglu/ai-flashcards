"use client"

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { usePathname, useRouter } from "next/navigation"

type Options = {
    name: string,
}

export type SetContent = {
    name: string,
}

const STYLING = {
    border:"2px solid black",
    borderRadius:"1rem",
    width:"80%", 
    height: "125px", 
    mb: 2,
    "&:hover": {
        backgroundColor:"#cdcccd"
    }
}

export default function Set({
    name
}: Options){
    const router = useRouter()
    const pathname= usePathname()

    const handleClick = (name: string) => {
        router.push(`${pathname}/${name}`);
    }

    return (
        <Box component="button" 
            sx={ STYLING }
            onClick={() => handleClick(name)} >
            
            <Typography>{name}</Typography>
        </Box>
    )
}