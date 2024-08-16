import Grid from "@mui/material/Grid";

type Options = {
    children?: JSX.Element[] | JSX.Element | null
}

export default function List({ 
    children 
}: Options) {
    if(children && !Array.isArray(children)) {
        children = [children];
    }

    return (
        <Grid container spacing={{ xs: 1, md: 2, lg: 2 }}>
            { 
                children
                ? children.map((el, idx) => {
                    return (
                        <Grid key={idx} item xs={3}>
                            { el }
                        </Grid>
                    );
                })
                : ''
            }
        </Grid>
    );
}