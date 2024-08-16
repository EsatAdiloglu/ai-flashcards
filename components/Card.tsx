'use client'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useState } from 'react';

type Options = {
    front: string,
    back: string
}

export type CardContent = Options

export default function Card({
    front, back
}: Options) {
    const [flipped, setFlipped] = useState<boolean>(false);

    return (
        <Box 
            component='button' 
            onClick={() => { setFlipped(!flipped) }} 
            sx={{ aspectRatio: '1 / 1' }} 
            minHeight={'100%'}
            maxWidth={'100%'}
            className='shadow-xl bg-slate-200' >
            
            <Box m={'10%'} p={3} 
                minHeight={'80%'}
                className='shadow-lg bg-white flex flex-col justify-center' >
                
                <Typography variant='body1' textAlign='center'>
                    { 
                        flipped 
                        ? back 
                        : front 
                    }
                </Typography>
            </Box>
        </Box>
    );
}