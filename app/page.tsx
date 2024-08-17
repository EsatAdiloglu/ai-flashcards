import Image from 'next/image';
import styles from '../styles/Home.module.css';
import getStripe from '@/utils/get-stripe'
import {SignedIn, SignedOut, UserButton} from '@clerk/nextjs'
import {AppBar, Box, Button, Container, Grid, Toolbar, Typography} from "@mui/material"
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
                        <Button color = "inherit" href ="/sign-in">Log In</Button>
                        <Button color = "inherit" href = "/sign-up">Sign Up</Button>
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
            
            <Box sx={{my: 6}}>
            <Typography variant="h4" component="h2" gutterBottom sx ={{textAlign: "center"}}>Features</Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>

                    <Typography variant = "h6">Easy Text Input</Typography>
                    <Typography>Input you text and let our software do the rest. </Typography>
                </Grid>

                <Grid item xs={12} md={4}>

                <Typography variant = "h6">AI Intelligence</Typography>
                <Typography>Input you text and let our software do the rest. </Typography>
                </Grid>

                <Grid item xs={12} md={4}>

                <Typography variant = "h6">Accessible Anywhere</Typography>
                <Typography>Input you text and let our software do the rest. </Typography>
                </Grid>
            </Grid>
            </Box>

        <Box sx = {{my:6}}>
            <Typography variant = "h4" sx={{mb: 3, textAlign: "center"}}>Pricing</Typography>
            <Grid sx = {{display: "flex", alignItems: "center", justifyContent: "center"}}container spacing={4}>
                
                <Grid item xs={12} md={4}>
                <Box sx = {{p: 3, border: '1px solid', borderColor: 'grey.300', borderRadius: 2}}>
                    <Typography variant = "h6">Basic Plan: Free</Typography>
                    <Typography>Input you text and let our software do the rest. </Typography>
                    
                    <Button variant = "contained">Choose Basic</Button>
                </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                <Box sx = {{p: 3, border: '1px solid', borderColor: 'grey.300', borderRadius: 2}}>
                    <Typography variant = "h6">Pro Plan: $3/month</Typography>
                    <Typography>Input you text and let our software do the rest. </Typography>

                    <Button variant = "contained">Choose Pro</Button>
                    </Box>
                </Grid>

            </Grid>
        </Box>

        </Container>
    );
}