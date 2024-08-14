import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useState } from 'react';

type Options = {
    onSubmit: ((t: string) => void) | ((t: string) => Promise<void>)
}

export default function PromptField({
    onSubmit
}: Options) {
    const [prompt, setPrompt] = useState<string>('');

    return (
        <Box my={3}>
            <Stack direction='column' spacing={2} >

                <TextField placeholder='Enter a prompt...' 
                    fullWidth multiline rows={5}
                    value={prompt} onChange={(e) => { setPrompt(e.target.value) }}/>

                <Button fullWidth variant='contained' onClick={async () => { await onSubmit(prompt) }}>
                    Generate
                </Button>

            </Stack>
        </Box>
    );
}