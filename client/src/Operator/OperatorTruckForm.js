import React from "react";
import OperatorContainer from "./OperatorContainer";
import { useForm } from "react-hook-form"
import { Box, Select, MenuItem, InputLabel, TextField, Button, Typography } from '@mui/material';


export default function OperatorTruckForm() {
	const { register, handleSubmit } = useForm();
	const onSubmit = function(data) {
		// connect to API and send POST request later
		console.log(data);
	}

	return (
		<OperatorContainer title={"Truck Details"}>
			<Box sx={{ margin: "4rem" }}>
				<Typography variant="h4">Add New Truck</Typography>
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
					<form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
						<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: "1rem"}}>
							<InputLabel>Name</InputLabel>
							<TextField label="Name" variant="outlined" {...register("name")} />
						</Box>
						<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: "1rem"}}>
							<InputLabel>Car Plate No</InputLabel>
							<TextField label="Car Plate No" variant="outlined" {...register("carplate")} />
						</Box>
						<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: "1rem"}}>
							<InputLabel>Cargo Space</InputLabel>
							<TextField label="In TEUs" variant="outlined" {...register("space")} />
						</Box>
					</form>
					<Button sx={{ marginTop: "1rem", backgroundColor: "#F3722C", color: "white"  }} type="submit">{"Confirm"}</Button>
				</Box>
			</Box>
		</OperatorContainer>
	);
}