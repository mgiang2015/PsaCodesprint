import { Box, Toolbar, AppBar, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import logo from '../assets/logoWithText.svg';
    
function NavBar() {
	return (
        <AppBar position="absolute" style={{ background: '#FFF', height: "10vh", zIndex: 100000000 }}>
            <Container maxWidth="xl" sx={{height: "100%" }}>
                <Toolbar sx={{display: "flex", alignItems: 'center', height: "100%"}}>
                    <IconButton component={Link} edge="start" sx={{ "&:hover": { backgroundColor: "transparent" } }} to="/" disableRipple>
                        <Box component="img" 
                                sx={{
                                    height: '6vh'
                                }}
                                src={logo}
                            />
                    </IconButton>
                    <Box sx={{flex: 1}} />
                    <Box>
                        <Button component={Link} sx={{width: 100, fontWeight: 500, mr: 3, textTransform: 'none'}} variant="outlined" disableElevation to="/login">Login</Button>
                        <Button component={Link} sx={{width: 100, textTransform: 'none' }} variant="contained" disableElevation to="/signup">Sign Up</Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
	)
}

export default NavBar;