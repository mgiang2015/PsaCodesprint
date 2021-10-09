import { Box } from "@mui/system";
import UndrawIcon from '../assets/UndrawIcon.svg'

function LandingPage() {
    return(
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: '4rem', flexWrap: 'wrap'}}>
            <Box component="img" 
            sx={{
                height: '30rem',
                width: '30rem',
            }}
            src={UndrawIcon}/>
            <Box sx={{ display: 'block', margin: '2' }}>
                <h1 style={{fontSize: "50px", marginBottom: "10px"}}>Optimise Your Logistic Flow</h1>
                <h1 style={{fontSize: "80px", marginTop: "0"}}>With NextTruck</h1>
                <p style={{maxWidth: "40rem"}}>Increase your Container Freight Station efficiency by reducing LCL cargo through our all-in-one management platform</p>
            </Box>
            
        </Box>
        

    )
}

export default LandingPage;