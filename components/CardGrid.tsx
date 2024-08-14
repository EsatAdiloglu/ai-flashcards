import type { CardContent } from './Card';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Card from './Card';

type Options = {
    cards: CardContent[]     // TODO: Make better type
}

export default function CardGrid({
    cards
}: Options) {
    return (
        <Box>
            <Stack spacing={3}>
                {
                    cards.map(({ front, back }, idx) => {
                        return <Card key={idx} question={front} content={back}/>
                    })
                }
            </Stack>
        </Box>
    );
}