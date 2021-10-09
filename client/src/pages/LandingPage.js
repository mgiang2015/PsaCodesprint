import { Box } from "@mui/system";
import { Button } from '@mui/material';
import UndrawIcon from '../assets/UndrawIcon.svg'

function LandingPage() {
    return(
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 20, flexWrap: 'wrap', gap: 5}}>
            <Box component="img" 
            sx={{
                height: '30rem',
                width: '30rem',
            }}
            src={UndrawIcon}/>
            <Box sx={{ display: 'block' }}>
                <h1 style={{fontSize: "50px", marginBottom: "0"}}>Optimise Your Logistic Flow</h1>
                <h1 style={{fontSize: "80px", margin: "0", display: 'inline'}}>With </h1>
                <h1 style={{fontSize: "80px", margin: "0", display: 'inline', color: '#F3722C'}}>NextTruck</h1>
                <br />
                <p style={{maxWidth: "40rem", lineHeight: '2rem'}}>Increase your Container Freight Station efficiency by reducing LCL cargo through our all-in-one management platform</p>
                <Button sx={{px: 5, py: 1,fontWeight: 600, mr: 3, textTransform: 'none', backgroundColor: "#F3722C", "&:hover": { backgroundColor: "#E8671B" }}} variant="contained" disableElevation href="/login">Register Now</Button>
            </Box>
            
        </Box>
        

    )
}

export default LandingPage;