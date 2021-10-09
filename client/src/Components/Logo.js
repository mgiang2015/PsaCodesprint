import { Box, Toolbar, AppBar, Button, IconButton } from '@mui/material';
import { Container } from '@mui/material';
import logo from '../assets/logoWithText.svg';

function Logo() {
	return (
        <AppBar position="static" style={{ background: '#FFF', height: "10vh" }}>
            <Container maxWidth="xxl">
            <Toolbar>
                <IconButton edge="start" sx={{ ml: 20, my: 1, "&:hover": { backgroundColor: "transparent" } }} href="/" disableRipple>
                    <Box component="img" 
                            sx={{
                                height: '4rem'
                            }}
                            src={logo}
                        />
                </IconButton>
                <Box sx={{flex: 1}} />
                <Box sx={{mr: 20}}>
                    <Button sx={{width: 100, fontWeight: 500, mr: 3, textTransform: 'none'}} variant="outlined" disableElevation href="/login">Login</Button>
                    <Button sx={{width: 100, textTransform: 'none' }} variant="contained" disableElevation href="/signup">Sign Up</Button>
                </Box>
            </Toolbar>
            </Container>
        </AppBar>
	)
}

export default Logo;