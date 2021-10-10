import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/authActions';
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
    MenuItem,
    FormHelperText
} from '@mui/material';
import { Logo } from '../assets/exportLogo';
import { PaddingY } from '../Utils/Padding';
import isEmpty from 'is-empty';

function LoginPage(props) {
    const [userType, setUserType] = useState('operators');
    const [userInput, setUserInput] = useState({
        username: '',
        password: '',
        errors: {
            email: '',
            password: '',
            message: ''
        }
    });

    useEffect(() => {
        if (props.error.login) {
            setUserInput({ ...userInput, errors: props.error.login });
        }
    }, [props.error.login]);

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            props.history.push('/dashboard');
        }
    }, [props.auth.isAuthenticated]);

    const { register, handleSubmit } = useForm();

    const onSubmit = function (data) {
        setUserInput({
            ...userInput,
            username: data['username'],
            password: data['password']
        });

        props.loginUser(data, props.history, userType);
    };

    const handleChange = function (data) {
        setUserType(data.target.value);
    };

    const { errors } = userInput;

    return (
        <Container
            sx={{
                height: '80vh',
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
                        px: '6vh',
                        py: '6vh',
                        borderRadius: 2
                    }}
                >
                    <Logo height={100} />
                    <h1>Welcome Back!</h1>
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
                        <FormHelperText error={!isEmpty(errors.message)}>
                            {errors.message}
                        </FormHelperText>
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
                            Login
                        </Button>
                    </Box>
                    <PaddingY padding={2} />

                    <Divider style={{ width: '100%' }}>or</Divider>

                    <PaddingY padding={2} />
                    <Button
                        component={Link}
                        variant="contained"
                        sx={{
                            display: 'flex',
                            px: 5,
                            textTransform: 'none',
                            width: '100%'
                        }}
                        to="/signup"
                    >
                        Sign Up
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

export default connect(mapStateToProps, { loginUser })(withRouter(LoginPage));
