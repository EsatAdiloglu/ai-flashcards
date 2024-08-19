'use client'

import getStripe from '@/utils/get-stripe'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut } from '@clerk/nextjs';
export default function Home() {
    const route = useRouter();
    const handleSubmit = async () => {
        const checkoutSession = await fetch('/api/checkout_sessions', {
            method: 'POST',
            headers: {
                origin: 'http://localhost:3000',
            },
        })

        const checkoutSessionJson = await checkoutSession.json()

        if (checkoutSessionJson.statusCode == 500){
            console.error(checkoutSessionJson.message)
            return
        }

        const stripe = await getStripe()
        const { error } = await stripe.redirectToCheckout({
            sessionId: checkoutSessionJson.id,
        })

        if (error) {
            console.warn(error.message)
        }
    }
    return (
        <Container maxWidth = "lg">
            <Box 
            sx = {{
                textAlign: "center"
            }}>
                <Typography variant = "h2">Welcome to Flashcard SaaS</Typography>
                <Typography variant = "h5">Easiest way to make flashcards from scratch</Typography>
                <Typography variant="subtitle1">
                    Created by Ryan Eshan, Esat Adiloglu, Saikarthik Mummadisingu, Nathaniel Escaro
                </Typography>

                <SignedIn>
                    <Button variant="contained" color = "primary" sx = {{mt:2}}
                        onClick={() => { route.push('/cards') }}>
                        
                        Go to Dashboard
                    </Button>
                </SignedIn>
                <SignedOut>
                    <Button variant="contained" color = "primary" sx = {{mt:2}}>Get Started</Button>
                </SignedOut>
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

                        <Button variant = "contained" onClick={handleSubmit}>Choose Pro</Button>
                        </Box>
                    </Grid>

                </Grid>
            </Box>

        </Container>
    );
}