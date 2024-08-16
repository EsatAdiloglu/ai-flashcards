import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function CardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        <AppBar position="static" sx={{display:"flex", flexDirection:"row", height:"10%"}}>
            <Typography variant="h2" sx={{flexGrow: 1, ml: "20px"}}>Test</Typography>
            <Button color="inherit" sx={{width:"100px"}}>Sign Out</Button>
        </AppBar>
        <main>{ children }</main>
      </>
    );
  }
  