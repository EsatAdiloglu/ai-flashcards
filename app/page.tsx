import Image from 'next/image';
import styles from '../styles/Home.module.css';
import getStripe from '@/utils/get-stripe'
import {SignedIn, SignedOut, UserButton} from '@clerk/nextjs'
import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material"
import Head from 'next/head'

export default function Home() {
    return (
        <Container maxWidth = "lg">

            <Head>
                <title>Flashcard SaaS</title>
                <meta name = "description" content = "Create flashcard"/>
            </Head>

            <AppBar position="static">
                <Toolbar>
                    <Typography variant = "h6" style = {{flexGrow: 1}}>Flashcard SaaS</Typography>
                    <SignedOut>
                        <Button color = "inherit">Log In</Button>
                        <Button color = "inherit">Sign Up</Button>
                    </SignedOut>

                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                </Toolbar>
            </AppBar>

            <Box 
            sx = {{
                textAlign: "center"
            }}>
                <Typography variant = "h2">Welcome to Flashcard SaaS</Typography>
                <Typography variant = "h5">Easiest way to make flashcards from scratch</Typography>

                <Button variant="contained" color = "primary" sx = {{mt:2}}>Get Started</Button>
            </Box>
            
            <Box sx = {{my:6}}>
                <Typography variant = "h4">
                    Features
                </Typography>
                
            </Box>

        </Container>
    );
}