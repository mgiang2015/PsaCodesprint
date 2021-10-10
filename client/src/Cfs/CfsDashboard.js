import InfoTable from "../Components/InfoTable"
import CfsContainer from "./CfsContainer"
import { Typography, Box } from '@mui/material';

export default function OperatorDashboard() {
	const defaultDataset = [
	["Cell", "Cell", "Cell", "Cell"],
	["Cell", "Cell", "Cell", "Cell"],
	["Cell", "Cell", "Cell", "Cell"],
	["Cell", "Cell", "Cell", "Cell"],
	["Cell", "Cell", "Cell", "Cell"],
	["Cell", "Cell", "Cell", "Cell"],
	["Cell", "Cell", "Cell", "Cell"],
	["Cell", "Cell", "Cell", "Cell"],
	["Cell", "Cell", "Cell", "Cell"]
	]

	const title1 = "Schedule";
	const headings1 = ["Delivery Truck", "Deliver By", "Origin Port", "Destination Port"];

	const title2 = "Operators";
	const headings2 = ["Operators", "Sending Volume", "Receiving Volume", "Total"];

	return (
		<CfsContainer>
			<Box sx={{ padding: "4rem" }}>
				<Typography variant="h2">Dashboard</Typography>
				<InfoTable title={title1} headings={headings1} datasets={defaultDataset} />
				<InfoTable title={title2} headings={headings2} datasets={defaultDataset} />
			</Box>
		</CfsContainer>
	)
}