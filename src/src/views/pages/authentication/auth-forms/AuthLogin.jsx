import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===============================|| JWT LOGIN ||=============================== //

const JWTLogin = ({ loginProp, ...others }) => {
    const theme = useTheme();

    const { login } = useAuth();
    //const scriptedRef = useScriptRef();
    const scriptedRef = useRef(true); // Create a ref to track if the component is mounted

    // Cleanup function to set scriptedRef to false when the component unmounts
    useEffect(() => {
        return () => {
            scriptedRef.current = false; // Set to false when the component unmounts
        };
    }, []);

    const [checked, setChecked] = React.useState(true);

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Formik
            initialValues={{
                logintype: '4',
                username: '',
                password: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                username: Yup.string().max(255).required('Username is required'),
                password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    // debugger;
                    const res = await login(values.logintype, values.username, values.password);

                    if (scriptedRef.current) {
                        // debugger;
                        setStatus({ success: true });
                        setSubmitting(false);
                    }
                } catch (err) {
                    // debugger;
                    if (scriptedRef.current) {
                        setStatus({ success: false });
                        // Assuming the error response is structured as { message: "Error message" }
                        const errorMessage = err || 'An error occurred. Please try again.';
                        setErrors({ submit: errorMessage }); // Set the error message from the API
                        setSubmitting(false);
                    }
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="logintype"
                            value={values.logintype} // Bind the value to Formik state
                            onChange={handleChange} // Handle change to update Formik state
                        >
                            <FormControlLabel value="1" control={<Radio />} label="PATIENT" />
                            <FormControlLabel value="4" control={<Radio />} label="PSC" />
                            <FormControlLabel value="3" control={<Radio />} label="HOC" />
                            <FormControlLabel value="2" control={<Radio />} label="REPORTS" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-email-login"> Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-login"
                            type="email"
                            value={values.username}
                            name="username"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                        />
                        {touched.username && errors.username && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                {errors.username}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-login"
                            type={showPassword ? 'text' : 'password'}
                            value={values.password}
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            inputProps={{}}
                            label="Password"
                        />
                        {touched.password && errors.password && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                {errors.password}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Keep me logged in"
                            />
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to={
                                    loginProp
                                        ? `/pages/forgot-password/forgot-password${loginProp}`
                                        : '/pages/forgot-password/forgot-password3'
                                }
                                color="secondary"
                                sx={{ textDecoration: 'none' }}
                            >
                                Forgot Password?
                            </Typography>
                        </Grid>
                    </Grid>

                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button color="secondary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                                Sign In
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

JWTLogin.propTypes = {
    loginProp: PropTypes.number
};

export default JWTLogin;
