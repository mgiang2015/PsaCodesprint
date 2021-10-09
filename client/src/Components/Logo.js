import { Box, Typography, Toolbar, AppBar, Button, IconButton } from '@mui/material';
import { Container } from '@mui/material';
import logo from '../assets/logoWithText.svg';
import styles from './Logo.css'

function Logo() {
	return (
        <AppBar position="static" style={{ background: '#FFF' }}>
            <Container maxWidth="xxl">
            <Toolbar>
                <IconButton edge="start" sx={{ ml: 20, my: 1, "&:hover": { backgroundColor: "transparent" } }}  disableRipple>
                    <Box component="img" 
                            sx={{
                                height: '4rem'
                            }}
                            src={logo}
                        />
                </IconButton>
                <Box sx={{flex: 1}} />
                <Box sx={{mr: 20}}>
                    <Button sx={{width: 100, fontWeight: 500, mr: 3, textTransform: 'none'}} variant="outlined" disableElevation>Login</Button>
                    <Button sx={{width: 100, textTransform: 'none' }} variant="contained" disableElevation>Sign Up</Button>
                </Box>
            </Toolbar>
            </Container>
        </AppBar>
	)
}

export default Logo;