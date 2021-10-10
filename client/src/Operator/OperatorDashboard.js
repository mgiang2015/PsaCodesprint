import InfoTable from "../Components/InfoTable";
import { useState, useEffect } from 'react';
import Datetime from 'react-datetime';
import OperatorContainer from "./OperatorContainer";
import { Typography, Box } from '@mui/material';

export default function OperatorDashboard() {
	const [schedules, setSchedules] = useState([]);
	const [operators, setOperators] = useState([]);

	useEffect(() => {
		fetch('/api/schedules')
			.then(res => res.json())
			.then(data => {
				console.log(data);
				const processedData = data.map(obj => [
					obj.assignedTruck.licensePlate,
					(new Date(obj.deliverBy).toLocaleDateString() + " at " + new Date(obj.deliverBy).toLocaleTimeString()),
					("" + obj.origin.block + "-" + obj.origin.unitNo),
					("" + obj.destination.block + "-" + obj.destination.unitNo)
				]);
				setSchedules(processedData);
				console.log(schedules);
			})

		fetch('/api/operators')
			.then(res => res.json())
			.then(data => {
				console.log(data);
				const processedData = data.map(obj => [
					obj.username,
					obj._id,
					obj.details
				]);
				setOperators(processedData);
				console.log(operators);
			})
	}, []);

	const defaultDataset = [
	["Cell1", "Cell2", "Cell3", "Cell4"]
	]

	const title1 = "Cargo Schedule";
	const headings1 = ["Delivery Truck", "Deliver By", "Origin Port", "Destination Port"];

	const title2 = "Full Schedule";
	const headings2 = ["Operators", "Sending Volume", "Receiving Volume", "Total"];

	return (
		<OperatorContainer title={"Welcome back, Operator Dani!"}>
			<Box sx={{ padding: "4rem" }}>
				<InfoTable title={title1} headings={headings1} datasets={schedules} />
			</Box>
		</OperatorContainer>
	)
}