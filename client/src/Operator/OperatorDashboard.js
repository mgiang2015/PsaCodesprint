import InfoTable from "../Components/InfoTable";
import OperatorContainer from "./OperatorContainer";
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
		<OperatorContainer title={"Welcome back, Operator Dani!"}>
			<Box sx={{ padding: "4rem" }}>
				<InfoTable title={title1} headings={headings1} datasets={defaultDataset} />
				<InfoTable title={title2} headings={headings2} datasets={defaultDataset} />
			</Box>
		</OperatorContainer>
	)
}