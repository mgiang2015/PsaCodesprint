import React from "react";
import { useForm } from "react-hook-form";
import { Paper, TextField, Button, Container, Box } from '@mui/material';
import { Logo } from "../assets/exportLogo";

export default function LoginPage() {
	const { register, handleSubmit } = useForm();
	const onSubmit = function(data) {
		// specify action later
		console.log(data);
	}

	return (
        <Container sx={{height: "80vh", width: "100%", alignItems:"center", justifyContent: "center", display: "flex"}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Paper elevation={6}
                    sx={{ display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        px: 10,
                        py: 5,
                        borderRadius: 2
                    }}>
        
                    <Logo height={100}/>
                    <h1>Welcome Back!</h1>
                    <br/>
                    <Box sx={{flexDirection: 'column',display: 'flex', gap: 2, width: "40vh"}}>
                        <TextField label="Username" variant="outlined" {...register("Username")} />
                        <TextField label="Password" variant="outlined" type="password" {...register("Password")} />
                    </Box>
                    <br />
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', width: "100%"}}>
                        <Button size="large" variant="contained" sx={{display: 'flex', fontWeight: 600}}>Login</Button>
                    </Box>
                </Paper>
            </form>
        </Container>
	)
}