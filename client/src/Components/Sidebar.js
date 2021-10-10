import { MenuList, MenuItem, Box } from '@mui/material';
import { Link } from "react-router-dom";
import { PaddingY } from '../Utils/Padding';


export default function Sidebar({ options }) {
	return (
		<Box sx={{ color: "#FFFFFF", backgroundColor: "#1D3557", padding: "2rem", height: "100%", fontFamily: "Montserrat" }}>
			<MenuList sx={{ height: "100%" }}>
				{options.map((option) => (
					<MenuItem>
						<Link style={{ textDecoration: "none", color: "#FFFFFF", fontFamily: "Montserrat" }} to={option[1]}>{option[0]}</Link>
                        <PaddingY padding={2}/>
					</MenuItem>
				))}
			</MenuList>
		</Box>
	)
}