import { Box } from "@mui/system";
import UndrawIcon from '../assets/UndrawIcon.svg'

function LandingPage() {
    return(
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: '4rem'}}>
            <Box component="img" 
            sx={{
                height: 500,
                width: 500,
            }}
            src={UndrawIcon}/>
            <Box sx={{ display: 'block', margin: '2' }}>
                <h1>Optimise Your Logistic Flow</h1>
                <h1>With NextTruck</h1>
                <p>Increase your Container Freight Station efficiency by reducing LCL cargo through our all-in-one management platform</p>
            </Box>
            
        </Box>
        

    )
}

export default LandingPage;