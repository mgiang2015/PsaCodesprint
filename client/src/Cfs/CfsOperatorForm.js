import React from "react";
import { useForm } from "react-hook-form"
import CfsContainer from "./CfsContainer"
import { Box, Select, MenuItem, InputLabel, TextField, Button, Typography } from '@mui/material';


export default function OperatorForm() {
	const { register, handleSubmit } = useForm();
	const onSubmit = function(data) {
		// connect to API and send POST request later
		console.log(data);
	}

	return (
		<CfsContainer>
			<Box sx={{ margin: "4rem" }}>
				<Typography variant="h4">Add New Operator</Typography>
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
					<form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
						<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: "1rem"}}>
							<InputLabel>Operator Name</InputLabel>
							<TextField sx={{ width: "50%" }} label="Name" variant="outlined" {...register("name")} />
						</Box>
						<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: "1rem"}}>
							<InputLabel>Additional Information</InputLabel>
							<TextField sx={{ width: "50%" }} label="Additional Details" variant="outlined" {...register("details")} />
						</Box>
					</form>
					<Button sx={{ marginTop: "1rem", backgroundColor: "#F3722C", color: "white"  }} type="submit">{"Confirm"}</Button>
				</Box>
			</Box>
		</CfsContainer>
	);
}