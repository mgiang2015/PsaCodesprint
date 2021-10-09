import React from "react";
import { useForm } from "react-hook-form";
import { Box, Paper, TextField, Button } from '@mui/material';


export default function SignupPage() {
	const { register, handleSubmit } = useForm();
	const onSubmit = function(data) {
		// specify action later
		console.log(data);
	}

	return (
	<Box>
		<form onSubmit={handleSubmit(onSubmit)}>
			<Paper sx={{ display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										width: 1/4 }}>
				<TextField label="Username" variant="outlined" {...register("Username")} />
				<TextField label="Password" variant="outlined" type="password"  {...register("Password")}/>
				<TextField label="Confirm Password" variant="outlined" type="password" {...register("Confirm")}/>
				<Button>Create Account</Button>
			</Paper>
		</form>
		<Button>Login to Your Account</Button>
	</Box>
	)
}