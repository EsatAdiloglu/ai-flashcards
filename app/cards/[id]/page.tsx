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
    // TODO: Get flashcards of the provided prompt
  }

  const cardEls = cards.map(({ front, back }, idx) => {
    return (<Card key={idx} question={front} content={back}/>)
  });

  return (
    <Container>
      <Typography variant='h1' textAlign='center'>
        Headstarter Flashcards
      </Typography>
      <Divider/>

      <PromptField onSubmit={handleSubmit}/>
      <Divider/>

      <Box my={3}>
        {
          cards.length > 0
          ? <List>{ cardEls }</List>
          : <Typography textAlign='center'>No cards to show.</Typography>
        }
      </Box>
      
    </Container>
  );
}
