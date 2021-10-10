import React, {useState} from "react";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Paper, TextField, Button, Container, Box, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Logo } from "../assets/exportLogo";
import { PaddingY } from "../Utils/Padding";
export default function LoginPage() {
	const { register, handleSubmit } = useForm();
	const onSubmit = function(data) {
		// specify action later
        data["userType"] = userType;
		console.log(data);
	}

    const [userType, setUserType] = useState("");
    const handleChange = function(data) {
        setUserType(data.target.value);
    }

	return (
        <Container sx={{display: "flex", height: "80vh", width: "100%", alignItems:"center", justifyContent: "center", my: '5vh'}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Paper elevation={12}
                    sx={{ display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        px: '6vh',
                        py: '6vh',
                        borderRadius: 2
                    }}>
                    <Logo height={100}/>
                    <h1>Welcome Back!</h1>
                    <Box sx={{flexDirection: 'column',display: 'flex', gap: 2, width: "40vh"}}>
                        <TextField label="Username" variant="outlined" {...register("Username")} />
                        <TextField label="Password" variant="outlined" type="password" {...register("Password")} />
                        <FormControl fullWidth variant="standard" >
                            <InputLabel id="demo-simple-select-label">User Type </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={userType}
                                label="User Type"
                                onChange={handleChange}
                            >
                                <MenuItem value={"operators"}>Operator</MenuItem>
                                <MenuItem value={"cfsAdmins"}>CFS Admin</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>
                    <PaddingY padding={1.5} />
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', width: "100%"}}>
                        <Button size="large" variant="contained" sx={{display: 'flex', px: 5, textTransform: 'none'}} type="submit">Login</Button>
                    </Box>
                    <PaddingY padding={2} />

                    <Divider style={{width:'100%'}}>or</Divider>

                    <PaddingY padding={2} />
                    <Button component={Link} variant="contained" sx={{display: 'flex', px: 5, textTransform: 'none', width: '100%'}} to="/signup">Sign Up</Button>
                </Paper>
            </form>
        </Container>
	)
}