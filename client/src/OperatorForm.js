import React from "react";
import { useForm } from "react-hook-form"
import { Select, MenuItem, InputLabel, TextField, Button } from '@mui/material';


export default function OperatorForm() {
	const { register, handleSubmit } = useForm();
	const onSubmit = function(data) {
		// connect to API and send POST request later
		console.log(data);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<Select {...register("destination")} label="Shipping to Operator">
					<MenuItem value="A">A</MenuItem>
					<MenuItem value="B">B</MenuItem>
					<MenuItem value="C">C</MenuItem>
					<MenuItem value="D">D</MenuItem>
				</Select>
			</div>
			<div>
				<TextField {...register("load")} label="Load (in TEU)" variant="outlined" />
			</div>
			<div>
				<TextField {...register("timeLimit")} label="Arrival time in HHMM" variant="outlined" />
			</div>
			<Button type="submit">{"Submit!"}</Button>
		</form>
	);
}