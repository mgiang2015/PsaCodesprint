import InfoTable from "../Components/InfoTable"
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

	const title1 = "Cargo Schedule";
	const headings1 = ["Delivery Truck", "Deliver By", "Origin Port", "Destination Port"];

	const title2 = "Full Schedule";
	const headings2 = ["Operators", "Sending Volume", "Receiving Volume", "Total"];

	return (
		<Box sx={{ padding: "4rem" }}>
			<Typography variant="h2">Welcome back, Operator Dani!</Typography>
			<InfoTable title={title1} headings={headings1} datasets={defaultDataset} />
			<InfoTable title={title2} headings={headings2} datasets={defaultDataset} />
		</Box>
	)
}