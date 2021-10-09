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
			<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
				<InputLabel>Operator Name</InputLabel>
				<TextField label="Name" variant="outlined" {...register("name")} />
			</Box>
			<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
				<InputLabel>Additional Information</InputLabel>
				<TextField label="Additional Details" variant="outlined" {...register("details")} />
			</Box>
			<Button type="submit">{"Confirm"}</Button>
		</form>
	);
}