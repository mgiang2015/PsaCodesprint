import React from "react";
import { useForm } from "react-hook-form";
import { Paper, TextField, Button } from '@mui/material';


export default function LoginPage() {
	const { register, handleSubmit } = useForm();
	const onSubmit = function(data) {
		// specify action later
		console.log(data);
	}

	return (
	<form onSubmit={handleSubmit(onSubmit)}>
		<Paper sx={{ display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									width: 1/4 }}>
			<TextField label="Username" variant="outlined" />
			<TextField label="Password" variant="outlined" type="password" />
			<Button>Login</Button>

		</Paper>
	</form>
	)
}