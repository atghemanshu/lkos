import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, Container, Grid, Checkbox, FormControlLabel, InputAdornment } from '@mui/material';
import axios from 'utils/axios';
import MainCard from 'ui-component/cards/MainCard';
import 'src/styles.css'; // Import your CSS file here
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch } from 'store';

const SinglePatientEnrollment = () => {
    const dispatch = useDispatch();
    const initialFormData = {
        username: '',
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        countryCode: 'US',
        phoneCountryCode: '+1',
        cellPhone: '',
        email: '',
        address1: '',
        address2: '',
        city: '',
        regionCode: '',
        postalCode: '',
        raceId: '',
        ethnicityId: '',
        providerId: '',
        clientId: '',
        subclientId: '',
        emailAlert: false,
        smsAlert: true,
        createdByUsername: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const [options, setOptions] = useState({
        genders: [],
        races: [],
        ethnicities: [],
        clients: [],
        subClients: [],
        countries: [],
        states: []
    });

    useEffect(() => {
        const serviceToken = window.localStorage.getItem('serviceToken');
        axios
            .get('https://myavawebapi.azurewebsites.net/api/OptionSet/PatientProfileOptions', {
                headers: {
                    Authorization: `Bearer ${serviceToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                setOptions(response.data);
                const defaultCountry = response.data.countries.find((country) => country.id === 'US');
                if (defaultCountry) {
                    setFormData((prevState) => ({ ...prevState, countryCode: defaultCountry.id }));
                }
            });
    }, []);

    const handleChange = (e) => {
        if (e.target.name == "raceId") {
            setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
        } else if (e.target.name == "ethnicityId") {
            setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
        } else if (e.target.name == "clientId") {
            setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
        }
        else if (e.target.name == "subclientId") {
            setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleClientChange = (e) => {
        setFormData({ ...formData, clientId: e.target.value, subclientId: '' });
    };

    const handleCountryChange = (e) => {
        setFormData({ ...formData, countryCode: e.target.value, regionCode: '' });
    };
    const resetForm = () => {
        setFormData(initialFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            alert('Invalid email format');
            return;
        }
        if (!/^\d{10,15}$/.test(formData.cellPhone)) {
            alert('Invalid phone number');
            return;
        }
        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.gender ||
            !formData.dateOfBirth ||
            !formData.cellPhone ||
            !formData.email ||
            !formData.address1 ||
            !formData.city ||
            !formData.regionCode ||
            !formData.postalCode ||
            !formData.clientId
        ) {
            alert('All required fields must be filled');
            return;
        }
        try {
            const serviceToken = window.localStorage.getItem('serviceToken');
            const user = localStorage.getItem('user');
            let StaffUserId = user ? JSON.parse(user).userId : '';
            const submissionData = {
                ...formData,
                cellPhone: `${formData.phoneCountryCode}${formData.cellPhone}`,
                providerId: 0,
                countryCode:"USA",
            };
            var res = await axios.post('https://myavawebapi.azurewebsites.net/api/Patient/CreatePatient', submissionData, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Patient created successfully');
            if (res.status == 201) {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Patient created successfully',
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: false
                    })
                );
                resetForm();
            }
        } catch (error) {
            console.error('Error creating patient', error);
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Error creating patient',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: false
                })
            );
        }
    };

    return (
        <MainCard title="Patient Enrollment">
            <Container maxWidth="md">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                select
                                fullWidth
                                label="Gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                InputLabelProps={{ shrink: true }}
                            >
                                {options.genders.map((g) => (
                                    <MenuItem key={g.id} value={g.displayValue}>
                                        {g.displayValue}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Date of Birth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField select fullWidth label="Race" name="raceId" value={formData.raceId} onChange={handleChange}>
                                {options.races.map((r) => (
                                    <MenuItem key={r.id} value={r.id}>
                                        {r.displayValue}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                select
                                fullWidth
                                label="Ethnicity"
                                name="ethnicityId"
                                value={formData.ethnicityId}
                                onChange={handleChange}
                            >
                                {options.ethnicities.map((e) => (
                                    <MenuItem key={e.id} value={e.id}>
                                        {e.displayValue}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                select
                                fullWidth
                                label="Client"
                                name="clientId"
                                value={formData.clientId}
                                onChange={handleClientChange}
                                required
                                InputLabelProps={{ shrink: true }}
                            >
                                {options.clients.map((c) => (
                                    <MenuItem key={c.id} value={c.id}>
                                        {c.displayValue}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                select
                                fullWidth
                                label="Subclient"
                                name="subclientId"
                                value={formData.subclientId}
                                onChange={handleChange}
                                required
                                InputLabelProps={{ shrink: true }}
                            >
                                {options.subClients
                                    .filter((sc) => sc.parent.id === formData.clientId)
                                    .map((sc) => (
                                        <MenuItem key={sc.id} value={sc.id}>
                                            {sc.displayValue}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item xs={4}>
                                    <TextField
                                        select
                                        fullWidth
                                        name="phoneCountryCode"
                                        value={formData.phoneCountryCode}
                                        onChange={handleChange}
                                        required
                                        InputLabelProps={{ shrink: true }}
                                    >
                                        <MenuItem value="+1">+1 (US)</MenuItem>
                                        <MenuItem value="+44">+44 (UK)</MenuItem>
                                        <MenuItem value="+91">+91 (India)</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        fullWidth
                                        label="Cell Phone"
                                        name="cellPhone"
                                        value={formData.cellPhone}
                                        onChange={handleChange}
                                        required
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Address 1"
                                name="address1"
                                value={formData.address1}
                                onChange={handleChange}
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Address 2"
                                name="address2"
                                value={formData.address2}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                select
                                fullWidth
                                label="Country"
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleCountryChange}
                                required
                                InputLabelProps={{ shrink: true }}
                            >
                                {options.countries.map((c) => (
                                    <MenuItem key={c.id} value={c.id}>
                                        {c.displayValue}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                select
                                fullWidth
                                label="State/Region"
                                name="regionCode"
                                value={formData.regionCode}
                                onChange={handleChange}
                                required
                                InputLabelProps={{ shrink: true }}
                            >
                                {options.states
                                    .filter((s) => s.parent.id === formData.countryCode)
                                    .map((s) => (
                                        <MenuItem key={s.id} value={s.id}>
                                            {s.displayValue}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Postal Code"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="emailAlert"
                                        checked={formData.emailAlert}
                                        onChange={(e) => setFormData({ ...formData, emailAlert: e.target.checked })}
                                    />
                                }
                                label="Email Alert"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="smsAlert"
                                        checked={formData.smsAlert}
                                        onChange={(e) => setFormData({ ...formData, smsAlert: e.target.checked })}
                                        required
                                        InputLabelProps={{ shrink: true }}
                                    />
                                }
                                label="SMS Alert"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <Button type="submit" variant="contained" color="primary" size="small">
                                        Submit
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button type="button" variant="outlined" color="secondary" size="small" onClick={resetForm}>
                                        Reset
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </MainCard>
    );
};

export default SinglePatientEnrollment;
