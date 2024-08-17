import { SignIn } from "@clerk/nextjs";
import { Container, Toolbar, Typography, AppBar, Button, Box} from "@mui/material";
import Link from 'next/link'

export default function SignUpPage(){
    return (
        <Container maxWidth = "lg">
            <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Link href="/">
                        <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: 'auto' }}>
                            Flashcard SaaS
                        </Typography>
                    </Link>
                    
                    <Box>
                    <Button color="inherit">
                        <Link href="/sign-in" passHref>
                            Login
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/sign-up" passHref>
                            Sign Up
                        </Link>
                    </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box
                display = "flex"
                flexDirection = "column"
                alignItems = "center"
                justifyContent = "center"
            >
                <Typography variant = "h4" sx={{p: 3}}>
                    Sign In
                </Typography>
                <SignIn/>

            </Box>
        </Container>
    )
}