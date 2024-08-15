'use client'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useState } from 'react';

type Options = {
    question: string,
    content: string
}

export type CardContent = {
    front: string,
    back: string
}

export default function Card({
    question, content
}: Options) {
    const [flipped, setFlipped] = useState<boolean>(false);

    return (
        <Box component='button' onClick={() => { setFlipped(!flipped) }}>
            <Typography>
                { 
                    flipped 
                    ? content 
                    : question 
                }
            </Typography>
        </Box>
    );
}