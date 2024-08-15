
import { Box, Grid, Stack } from "@mui/material"
import Set from "./Set"
import { SetContent } from "./Set"


type Options = {
    sets: SetContent[]
}

export default function SetGrid({sets}: Options){
    return (
                <Grid container spacing={2} sx={{mt: 2, ml:"20px"}}>
                    {
                        sets.map(({name}, idx) => {
                            return <Set key={idx} name={name} />
                        })
                    }
                </Grid>
    )
}