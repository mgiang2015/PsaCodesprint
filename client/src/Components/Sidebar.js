import { MenuList, MenuItem, Box, Drawer, Toolbar, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from "react-router-dom";
import { PaddingY } from '../Utils/Padding';

const drawerWidth = 240;

export default function Sidebar({ options }) {
	return (
        <Box sx={{backgroundColor: "red", px: 2}}>
            <Drawer
                variant="permanent"
                sx={{
                width: drawerWidth,
                maxHeight: "100%"
                }}
            >            
                <Box sx={{ backgroundColor: "#1D3557" }}>
                        <MenuList sx={{ height: "100%" }}>
                        {options.map((option) => (
                            <MenuItem>
                                <Link style={{ textDecoration: "none", color: "#FFFFFF", fontFamily: "Montserrat" }} to={option[1]}>{option[0]}</Link>
                                <PaddingY padding={2}/>
                            </MenuItem>
                        ))}
                    </MenuList>
                    </Box>
                    <Box sx={{ color: "#FFFFFF", backgroundColor: "#1D3557", padding: "2vw", height: "100%" }}>
                    <MenuList sx={{ height: "100%" }}>
                        {options.map((option) => (
                            <MenuItem>
                                <Link style={{ textDecoration: "none", color: "#FFFFFF", fontFamily: "Montserrat" }} to={option[1]}>{option[0]}</Link>
                                <PaddingY padding={2}/>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Box>

            </Drawer>

        </Box>
	)
}