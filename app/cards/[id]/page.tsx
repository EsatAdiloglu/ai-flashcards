'use client'

import type { CardContent } from '@/components/Card';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import PromptField from '@/components/PromptField';
import List from '@/components/List';
import Card from '@/components/Card';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from "@/firebase"
import { collection, doc, getDoc, getDocs, query, writeBatch } from 'firebase/firestore';
import { Button } from '@mui/material';

const test = {flashcards: [{front:"what is 1+1?",back:"11"},{front:"how many bits is in a byte?",back:"8 bits"},{front:"Dağ",back:"Mountain"},
  {front:"what blade does Esat fence?",back:"Epee"},{front:"How many Ls does Sai take?",back:"Way to many"},{front:"What is a child process's id",back:"0"},
  {front:"What should Nathaniel do?",back:"Go to the gym"},{front:"What anime should Ryan watch?",back:"toradora"},{front:"What year did America declare independence",back:"1776"},
  {front:"What mascot does Stevens have",back:"Attila duck"}]}

  const test2 = {flashcards: [{front:"a^2 + b^2 =?",back:"c^2"},{front:"gojo?",back:"satoru"},{front:"which came first the chicken or the egg?",back:"egg"},{front:"what should i be doing",back:"sleep"}]}

export default function CardPage() {
  const [cards, setCards] = useState<CardContent[]>([]);
  const [setName, setSetName] = useState("")
  const param = useParams<{id: string}>()


  useEffect(() => {
    setSetName(param.id)
  },[])

  useEffect(() => {
    updateFlashCards()
  },[setName])

  async function handleSubmit(prompt: string) {
    // TODO: Get flashcards of the provided prompt
  }

  const cardEls = cards.map(({ front, back }, idx) => {
    return (<Card key={idx} front={front} back={back}/>)
  });

  const updateFlashCards = async () => {
    try{
      if(setName){
        const userDocRef = doc(collection(db,"users"),"test")
        const colRef = collection(userDocRef, setName)
        const snapshot = query(colRef)
        const docs = await getDocs(snapshot)
        const current_flashcards: CardContent[] = []
        docs.forEach(flashcard => {
          //idk why, it just works
          current_flashcards.push({front: flashcard.data().back, back: flashcard.data().front})
        })
        setCards(current_flashcards)
      }
    }
    catch (error){
      console.error(error)
    }
  }

  const addFlashCards = async () => {
    try{
      const batch = writeBatch(db)
      const userDocRef = doc(collection(db,"users"),"test")
      const colRef = collection(userDocRef, setName)
      test.flashcards.forEach(flashcard  => {
        const cardDocRef = doc(colRef)
        batch.set(cardDocRef, flashcard)
      })

      await batch.commit()
      await updateFlashCards()
    }
    catch(error){
      console.error(error)
    }
  }

    const addFlashCards2 = async () => {
      try{
        const batch = writeBatch(db)
        const userDocRef = doc(collection(db,"users"),"test")
        const colRef = collection(userDocRef, setName)
        test2.flashcards.forEach((flashcard: CardContent) => {
          const cardDocRef = doc(colRef)
          batch.set(cardDocRef, flashcard)
        })
  
        await batch.commit()
  
      }
      catch(error){
        console.error(error)
      }
    }

  return (
    <Container>
      <Typography variant='h1' textAlign='center'>
        Headstarter Flashcards
      </Typography>
      <Button onClick={addFlashCards}>Click</Button>
      <Button onClick={addFlashCards2}>Click2</Button>
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
