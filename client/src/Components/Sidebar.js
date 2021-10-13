import { MenuList, MenuItem, Box, Drawer, Toolbar, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from "react-router-dom";
import { PaddingY } from '../Utils/Padding';

const drawerWidth = "15vw";

export default function Sidebar({ options }) {
	return (            
            <Drawer
                variant="permanent"
                sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth },
                backgroundColor: "red"
                }}
            >       
                <Box sx={{ backgroundColor: "#1D3557",  height: "100%", paddingBottom: 0, overflow: 'auto', paddingLeft: 2 }}>
                        <MenuList sx={{ height: "100%", paddingY:  0}}>
                            <PaddingY padding={"8vh"} />
                        {options.map((option) => (
                            <MenuItem sx={{paddingBottom: 0}} key={option}>
                                <Link style={{ textDecoration: "none", color: "#FFFFFF", fontFamily: "Montserrat" }} to={option[1]}>{option[0]}</Link>
                                <PaddingY padding={3}/>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Box>
            </Drawer>

	)
}