'use client'

import type { CardContent } from '@/components/Card';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import PromptField from '@/components/PromptField';
import CardGrid from '@/components/CardGrid';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const [cards, setCards] = useState<CardContent[]>([]);
  const searchParams = useSearchParams()
  const SetName = searchParams.get("set")
  console.log(SetName)


  async function handleSubmit(prompt: string) {
    // TODO: Get flashcards of the provided prompt
  }


  useEffect(() => {
    const fetchCards = async () =>{
      try{
      const response = await fetch("/api/testcard")
      const data = await response.json()
      const current_flashcards: CardContent[] = []
      data.flashcards.forEach((flashcard: CardContent) => {
       current_flashcards.push({front: flashcard.front, back: flashcard.back})
      })
      setCards(current_flashcards)
      }
      catch(error){
        console.error(error)
      }
    }

    fetchCards()

  }, [])

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
          ? <CardGrid cards={cards}/>
          : <Typography textAlign='center'>No cards to show.</Typography>
        }
      </Box>
      
    </Container>
  );
}
