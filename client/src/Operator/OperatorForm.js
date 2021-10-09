import React from "react";
import { useForm } from "react-hook-form"
import { Box, Select, MenuItem, InputLabel, TextField, Button } from '@mui/material';


export default function OperatorForm() {
	const { register, handleSubmit } = useForm();
	const onSubmit = function(data) {
		// connect to API and send POST request later
		console.log(data);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} style={{ width: 500 }}>
			<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
				<InputLabel>Date</InputLabel>
				<TextField label="Date" variant="outlined" {...register("date")} />
			</Box>
			<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
				<InputLabel>Cargo Size</InputLabel>
				<TextField label="In TEUs" variant="outlined" {...register("size")} />
			</Box>
			<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
				<InputLabel>Origin Warehouse</InputLabel>
				<Select label="Select a Warehouse" sx={{ minWidth: 1/3 }} variant="outlined" {...register("origin")}>
					<MenuItem value="a">A</MenuItem>
					<MenuItem value="b">B</MenuItem>
					<MenuItem value="c">C</MenuItem>
					<MenuItem value="d">D</MenuItem>
					<MenuItem value="e">E</MenuItem>
					<MenuItem value="f">F</MenuItem>
					<MenuItem value="g">G</MenuItem>
					<MenuItem value="h">H</MenuItem>
				</Select>
			</Box>
			<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
				<InputLabel>Destination Warehouse</InputLabel>
				<Select label="Select a Warehouse" sx={{ minWidth: 1/3 }} variant="outlined" {...register("destination")}>
					<MenuItem value="a">A</MenuItem>
					<MenuItem value="b">B</MenuItem>
					<MenuItem value="c">C</MenuItem>
					<MenuItem value="d">D</MenuItem>
					<MenuItem value="e">E</MenuItem>
					<MenuItem value="f">F</MenuItem>
					<MenuItem value="g">G</MenuItem>
					<MenuItem value="h">H</MenuItem>
				</Select>
			</Box>
			<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
				<InputLabel>Delivery Time</InputLabel>
				<Select label="Select a time" variant="outlined" sx={{ minWidth: 1/3 }} {...register("deliveryTime")}>
					<MenuItem value="1000">1000</MenuItem>
					<MenuItem value="1100">1100</MenuItem>
					<MenuItem value="1200">1200</MenuItem>
					<MenuItem value="1300">1300</MenuItem>
					<MenuItem value="1400">1400</MenuItem>
					<MenuItem value="1500">1500</MenuItem>
					<MenuItem value="1600">1600</MenuItem>
					<MenuItem value="1700">1700</MenuItem>
				</Select>
			</Box>
			<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
				<InputLabel>Closing Time</InputLabel>
				<Select labelId="Select a time" sx={{ minWidth: 1/3 }} variant="outlined" {...register("closingTime")}>
					<MenuItem value="1000">1000</MenuItem>
					<MenuItem value="1100">1100</MenuItem>
					<MenuItem value="1200">1200</MenuItem>
					<MenuItem value="1300">1300</MenuItem>
					<MenuItem value="1400">1400</MenuItem>
					<MenuItem value="1500">1500</MenuItem>
					<MenuItem value="1600">1600</MenuItem>
					<MenuItem value="1700">1700</MenuItem>
				</Select>
			</Box>
			<Button type="submit">{"Confirm"}</Button>
		</form>
	);
}