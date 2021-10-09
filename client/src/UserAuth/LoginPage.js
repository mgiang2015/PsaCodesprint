import React from "react";
import { useForm } from "react-hook-form";
import { Paper, TextField, Button, Container, Box, Divider } from '@mui/material';
import { Logo } from "../assets/exportLogo";
import { PaddingY } from "../Utils/Padding";
export default function LoginPage() {
	const { register, handleSubmit } = useForm();
	const onSubmit = function(data) {
		// specify action later
		console.log(data);
	}

	return (
        <Container sx={{height: "80vh", width: "100%", alignItems:"center", justifyContent: "center", display: "flex"}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Paper elevation={12}
                    sx={{ display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        px: 6,
                        py: 6,
                        borderRadius: 2
                    }}>
                    <Logo height={100}/>
                    <h1>Welcome Back!</h1>
                    <Box sx={{flexDirection: 'column',display: 'flex', gap: 2, width: "40vh"}}>
                        <TextField label="Username" variant="outlined" {...register("Username")} />
                        <TextField label="Password" variant="outlined" type="password" {...register("Password")} />
                    </Box>
                    <PaddingY padding={1.5} />
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', width: "100%"}}>
                        <Button size="large" variant="contained" sx={{display: 'flex', px: 5, textTransform: 'none'}}>Login</Button>
                    </Box>
                    <PaddingY padding={2} />

                    <Divider style={{width:'100%'}}>or</Divider>
                    
                    <PaddingY padding={2} />
                    <Button variant="contained" sx={{display: 'flex', px: 5, textTransform: 'none', width: '100%'}}>Login</Button>
                </Paper>
            </form>
        </Container>
	)
}