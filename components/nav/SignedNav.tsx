import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import { UserButton } from "@clerk/nextjs";
import BaseNav from "./BaseNav";
import NavGap from "./NavGap";

export default function SignedNav() {
    return (
        <BaseNav>
            <Grid container>
                <Grid>
                    <Typography component='a' variant='h6' href='/cards'>Dashboard</Typography>
                    <Typography component='a' variant='h6' href='#'>Generate</Typography>
                </Grid>
                <NavGap/>
                <Grid item container xs={1}>
                    <NavGap/>
                    <UserButton/>
                </Grid>
            </Grid>
        </BaseNav>
    );
}