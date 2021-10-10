import Sidebar from "../Components/Sidebar";
import { Box, Typography } from '@mui/material';


export default function OperatorContainer(props) {
	const sidebarOptions = [
		["Dashboard", "/cfs"],
		["Add new operator", "/cfs/addOperator"],
		["Full Schedule", "/cfs"] // leads back to dashboard for now
	];

	return (
		<Box sx={{display: "flex", flexDirection: "row", justifyContent: "flex-start", height: "100rem"}}>
			<Sidebar options={sidebarOptions} />
			<Box sx={{paddingTop: "4rem", paddingLeft: "2rem", minWidth: "50%"}}>
				<Typography variant="h3">{props.title}</Typography>
				{props.children}
			</Box>
		</Box>
	);
}