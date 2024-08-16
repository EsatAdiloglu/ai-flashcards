import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import BaseNav from "./BaseNav";
import NavGap from "./NavGap";

export default function DefaultNav() {
    return (
        <BaseNav>
            <Grid container>
                <NavGap/>
                <Grid item container xs={2}>
                    <NavGap/>
                    <Button color="inherit">Log In</Button>
                    <Button color="inherit">Sign Up</Button>
                </Grid>
            </Grid>
        </BaseNav>
    );
}