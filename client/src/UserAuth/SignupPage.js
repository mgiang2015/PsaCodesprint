import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { Paper, TextField, Button, Container, Box, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Logo } from "../assets/exportLogo";
import { PaddingY } from "../Utils/Padding";

export default function SignupPage() {
    const [userType, setUserType] = useState("");
	const { register, handleSubmit } = useForm();
	const onSubmit = function(data) {
        data["userType"] = userType;
	}

    const handleChange = function(data) {
        setUserType(data.target.value);
    }

	return (
        <Container sx={{height: "90vh", width: "100%", alignItems:"center", justifyContent: "center", display: "flex", backgroundColor: "red"}}>
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
                    <h1>Create New Account</h1>
                    <Box sx={{flexDirection: 'column', display: 'flex', gap: 2, width: "40vh"}}>
                        <TextField label="Username" variant="outlined" {...register("username")} />
                        <TextField label="Password" variant="outlined" type="password"  {...register("password")}/>
                        <TextField label="Confirm Password" variant="outlined" type="password" {...register("password2")}/>
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
                        <Button size="large" variant="contained" sx={{display: 'flex', px: 5, textTransform: 'none'}} type="submit">Sign Up</Button>
                    </Box>
                    <PaddingY padding={2} />
                    <Divider style={{width:'100%'}}>or</Divider>
                    <PaddingY padding={2} />
                    <Button variant="contained" sx={{display: 'flex', px: 5, textTransform: 'none', width: '100%'}} href="/login">Login</Button>
                </Paper>
            </form>
        </Container>
	)
}