import { MenuList, MenuItem, Box } from '@mui/material';
import { Link } from "react-router-dom";


export default function Sidebar({ options }) {
	// options should be a 2D array, each element is
	// an array with [0] being the option, [1] is the href link
	return (
		<Box sx={{ color: "#FFFFFF", backgroundColor: "#1D3557", padding: "2rem", height: "100%" }}>
			<MenuList sx={{ height: "100%" }}>
				{options.map((option) => (
					<MenuItem key={option[0]}>
						<Link style={{ textDecoration: "none", color: "#FFFFFF" }} to={option[1]}>{option[0]}</Link>
					</MenuItem>
				))}
			</MenuList>
		</Box>
	)
}