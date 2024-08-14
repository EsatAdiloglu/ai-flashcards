'use client'

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import PromptField from '@/components/PromptField';
import CardGrid from '@/components/CardGrid';

export default function Home() {
  return (
    <main>
      <Container>
        <Typography variant='h1' textAlign='center'>
          Headstarter Flashcards
        </Typography>
        <Divider/>

        <PromptField onSubmit={() => {}}/>
        <Divider/>

        <CardGrid/>
      </Container>
    </main>
  );
}
