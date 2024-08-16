import getStripe from '@/utils/get-stripe'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Home() {
    return (
        <Container maxWidth = "lg">
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