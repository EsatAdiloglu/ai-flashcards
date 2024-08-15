"use client"

import { Box, Typography } from "@mui/material"
import { useRouter } from "next/router"

type Options = {
    name: string,
}


export default function Set({name}: Options){
    const router = useRouter()

    const handleClick = (name: string) => {
        router.push(`/app/cards/${name}`)
    }
    
    return (
        <Box component="button" onClick={() => {}}>
            <Typography>{name}</Typography>
        </Box>
    )
}