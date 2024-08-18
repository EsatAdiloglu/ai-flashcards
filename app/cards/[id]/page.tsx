'use client'

import type { CardContent } from '@/components/Card';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import PromptField from '@/components/PromptField';
import List from '@/components/List';
import Card from '@/components/Card';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';

export default function CardPage() {
  const [name, setName] = useState<string>('');
  const [cards, setCards] = useState<CardContent[]>([]);
  const { id } = useParams<{id: string}>();
  const apiRoute = `/api/sets/${id}`;

  const updateSet = useCallback(async () => {
    try {
      const res = await fetch(apiRoute);
      const pastCards = await res.json();

      setName(pastCards.name as string);
      setCards(pastCards.cards as CardContent[]);
    } catch(e) {
      console.error((e as Error).message);
    }
  }, [setName, setCards, apiRoute])

  const handleSubmit = async (prompt: string) => {
    try {
      const aiRes = await fetch('/api/generate', {
        method: 'POST',
        body: prompt
      });
  
      const cardJson = await aiRes.json() as CardContent[];
      //setCards(cardJson);
      
      const fbRes = await fetch(apiRoute, {
        method: 'POST',
        body: JSON.stringify(cardJson)
      })

      if(!fbRes.ok) {
        throw Error(await fbRes.text())
      }
  
      await updateSet();
    } catch(e) {
      console.error((e as Error).message);
    }
  }

  useEffect(() => {
    updateSet()
  }, [updateSet])

  const cardEls = cards.map(({ front, back }, idx) => {
    return (<Card key={idx} front={front} back={back}/>)
  });

  return (
    <Container>
      <Typography variant='h1' textAlign='center'>
        { /* Retrieve the name server-side in the future */}
        Set { name }
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
