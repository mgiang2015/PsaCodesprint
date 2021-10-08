import React from "react";
import { useForm } from "react-hook-form"

export default function OperatorForm() {
	const { register, handleSubmit } = useForm();
	const onSubmit = function(data) {
		// connect to API and send POST request later
		console.log(data);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label>{"Shipping to Operator"}</label>
				<select {...register("destination")}>
					<option value="A">A</option>
					<option value="B">B</option>
					<option value="C">C</option>
					<option value="D">D</option>
				</select>
			</div>
			<div>
				<label>{"Load (in TEU)"}</label>
				<input {...register("load")} />
			</div>
			<div>
				<label>{"Arrival time in HHMM"}</label>
				<input {...register("timeLimit")} />
			</div>
			<button type="submit">{"Submit!"}</button>
		</form>
	);
}