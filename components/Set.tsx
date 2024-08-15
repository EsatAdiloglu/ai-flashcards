"use client"

import { Box, Grid, Typography } from "@mui/material"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

type Options = {
    name: string,
}

export type SetContent = {
    name: string,
}

export default function Set({name}: Options){
    const router = useRouter()
    const pathname= usePathname()
    const searchParams = useSearchParams()

    /*
    const createQueryString = useCallback(
        (name: string, value:string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name,value)
            return params.toString()
        },
        [searchParams]
    )
    */

    const handleClick = (name: string) => {
        router.push("/cards/" + name)
    }

    return (
        <Grid xs={12} md={3}>
            <Box component="button" 
            sx={{
                border:"2px solid black",
                borderRadius:"1rem",
                width:"80%", 
                height: "125px", 
                mb: 2,
                "&:hover": {
                    backgroundColor:"#cdcccd"
                }}}
                onClick={() => handleClick(name)}>
                    <Typography>{name}</Typography>
            </Box>
        </Grid>
    )
}