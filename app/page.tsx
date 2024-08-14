'use client'

import type { CardContent } from '@/components/Card';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import PromptField from '@/components/PromptField';
import CardGrid from '@/components/CardGrid';

import { useState } from 'react';

export default function Home() {
  const [cards, setCards] = useState<CardContent[]>([]);

  async function handleSubmit(prompt: string) {
    // TODO: Get flashcards of the provided prompt
  }

  return (
    <main>
      <Container>
        <Typography variant='h1' textAlign='center'>
          Headstarter Flashcards
        </Typography>
        <Divider/>

        <PromptField onSubmit={handleSubmit}/>
        <Divider/>

        <CardGrid cards={cards}/>
      </Container>
    </main>
  );
}
