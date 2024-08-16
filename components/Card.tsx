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
        <Box component='button' onClick={() => { setFlipped(!flipped) }}>
            <Typography>
                { 
                    flipped 
                    ? front 
                    : back 
                }
            </Typography>
        </Box>
    );
}