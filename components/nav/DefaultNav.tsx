import { SignInButton } from "@clerk/nextjs";
import Grid from "@mui/material/Grid";
import BaseNav from "./BaseNav";
import NavGap from "./NavGap";

export default function DefaultNav() {
    return (
        <BaseNav>
            <Grid container>
                <NavGap/>
                <Grid item container xs={2}>
                    <NavGap/>
                    <SignInButton/>
                </Grid>
            </Grid>
        </BaseNav>
    );
}