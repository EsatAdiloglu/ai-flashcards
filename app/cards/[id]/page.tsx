'use client'

import type { CardContent } from '@/components/Card';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import PromptField from '@/components/PromptField';
import List from '@/components/List';
import Card from '@/components/Card';

import { useState } from 'react';

export default function CardPage() {
  const [cards, setCards] = useState<CardContent[]>([]);

  async function handleSubmit(prompt: string) {
    const res = await fetch('/api/generate', {
      method: 'POST',
      body: prompt
    });

    const cardJson = await res.json() as CardContent[];
    setCards(cardJson);
  }

  const cardEls = cards.map(({ front, back }, idx) => {
    return (<Card key={idx} front={front} back={back}/>)
  });

  return (
    <Container>
      <Typography variant='h1' textAlign='center'>
        { /* Retrieve the name server-side in the future */}
        Set { '"Set Name"' }
      </Typography>
      <Divider/>

      <PromptField onSubmit={handleSubmit}/>
      <Divider/>

      <Box my={3}>
        {
          cards.length > 0
          ? <List>{ cardEls }</List>
          : 
          <Box>
          <Typography textAlign='center'>No cards to show.</Typography>
          
          </Box>
        }
      </Box>
      
    </Container>
  );
}
