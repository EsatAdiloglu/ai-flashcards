
import { Box, Stack } from "@mui/material"
import Set from "./Set"
import { SetContent } from "./Set"
type Options = {
    sets: SetContent[]
}

export default function SetGrid({sets}: Options){
    return (
        <Box>
            <Stack spacing={3}>
                {
                    sets.map(({name}, idx) => {
                        return <Set key={idx} name={name} />
                    })
                }
            </Stack>
        </Box>
    )
}