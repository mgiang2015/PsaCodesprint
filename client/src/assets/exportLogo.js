import logo from './logo.svg';
import logoWithText from './logoWithText.svg';
import { Box } from '@mui/material';

export function Logo(height) {
    return(
        <Box component="img" 
            sx={{
                height: height
            }}
            src={logo}/>
    )
}
export function LogoWithText(height) {
    return(
        <Box component="img" 
            sx={{
                height: height
            }}
            src={logoWithText}/>
    )
}