import AppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';

type Options = {
    children: React.ReactNode
}

export default function BaseNav({
    children
}: Options) {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Grid container spacing={2}>
                    <Grid item xs='auto'>
                        <Typography component='a' variant='h6' href='/'>Flashcard SaaS</Typography>
                    </Grid>
                    <Grid item xs>
                        { children }
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}