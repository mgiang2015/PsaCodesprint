import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { registerUser } from '../redux/actions/authActions';
import {
    Paper,
    TextField,
    Button,
    Container,
    Box,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { Logo } from '../assets/exportLogo';
import { PaddingY } from '../Utils/Padding';

function SignupPage(props) {
    const [userType, setUserType] = useState('operators');

    const { register, handleSubmit } = useForm();

    const [userInput, setUserInput] = useState({
        username: '',
        password: '',
        password2: '',
        errors: {
            username: '',
            password: '',
            password2: '',
            message: ''
        }
    });

    useEffect(() => {
        if (props.error.register) {
            setUserInput({ ...userInput, errors: props.error.register });
        }
    }, [props.error.register]);

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            props.history.push('/dashboard');
        }
    }, [props.auth.isAuthenticated]);

    const onSubmit = function (data) {
        setUserInput({
            ...userInput,
            username: data['username'],
            password: data['password'],
            password2: data['password2']
        });

        console.log(data);

        props.registerUser(data, props.history, userType);
    };

    const handleChange = function (data) {
        setUserType(data.target.value);
    };

    const { errors } = userInput;

    return (
        <Container
            sx={{
                maxHeight: '90vh',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex'
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Paper
                    elevation={12}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        px: 6,
                        py: 6,
                        borderRadius: 2
                    }}
                >
                    <Logo height={100} />
                    <h1>Create New Account</h1>
                    <Box
                        sx={{
                            flexDirection: 'column',
                            display: 'flex',
                            gap: 2,
                            width: '40vh'
                        }}
                    >
                        <TextField
                            label="Username"
                            variant="outlined"
                            error={errors.username}
                            helperText={errors.username}
                            {...register('username')}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            error={errors.password}
                            helperText={errors.password}
                            {...register('password')}
                        />
                        <TextField
                            label="Confirm Password"
                            variant="outlined"
                            type="password"
                            error={errors.password2}
                            helperText={errors.password2}
                            {...register('password2')}
                        />
                        <FormControl fullWidth variant="standard">
                            <InputLabel id="demo-simple-select-label">
                                User Type{' '}
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={userType}
                                label="User Type"
                                onChange={handleChange}
                            >
                                <MenuItem value={'operators'}>
                                    Operator
                                </MenuItem>
                                <MenuItem value={'cfsAdmins'}>
                                    CFS Admin
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <PaddingY padding={1.5} />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            width: '100%'
                        }}
                    >
                        <Button
                            size="large"
                            variant="contained"
                            sx={{
                                display: 'flex',
                                px: 5,
                                textTransform: 'none'
                            }}
                            type="submit"
                        >
                            Sign Up
                        </Button>
                    </Box>
                    <PaddingY padding={2} />
                    <Divider style={{ width: '100%' }}>or</Divider>
                    <PaddingY padding={2} />
                    <Button
                        variant="contained"
                        sx={{
                            display: 'flex',
                            px: 5,
                            textTransform: 'none',
                            width: '100%'
                        }}
                        href="/login"
                    >
                        Login
                    </Button>
                </Paper>
            </form>
        </Container>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.errors
});

export default connect(mapStateToProps, { registerUser })(
    withRouter(SignupPage)
);
