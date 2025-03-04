import React, { useEffect, useState } from 'react';
import { Grid, Button, CircularProgress, Typography, Box, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import PatientCard from './PatientCard';
import { ThemeMode } from 'config';
import useConfig from 'src/hooks/useConfig';
import { useTheme } from '@mui/material/styles';

const Profile = ({ filter }) => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const { mode, borderRadius } = useConfig();
    const theme = useTheme();

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const user = localStorage.getItem('user');
                let StaffUserId = user ? JSON.parse(user).userId : '';
                const serviceToken = window.localStorage.getItem('serviceToken');
                const response = await fetch(`https://myavawebapi.azurewebsites.net/api/Patient/GetAllPatients`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${serviceToken}`, // Passing token here
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();

                if (data.status) {
                    setPatients(data.data);
                }
            } catch (error) {
                console.error('Error fetching patient data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPatients();
    }, []);

    const filteredPatients = patients.filter((patient) => {
        if (filter !== 'ALL') {
            if (filter === 'RPM' && !patient.isRPM) return false;
            if (filter === 'CCM' && !patient.isCCM) return false;
            if (filter === 'Telehealth' && !patient.isTelehealth) return false;
        }
        return patient.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const sortedPatients = [...filteredPatients].sort((a, b) => {
        if (sortBy === 'name') return a.fullName.localeCompare(b.fullName);
        if (sortBy === 'age') return a.age - b.age;
        if (sortBy === 'lastVisit') return new Date(b.lastVisit) - new Date(a.lastVisit);
        return 0;
    });

    return (
        <Box
            sx={{
                height: '700px',
                overflowY: 'auto',
                padding: '10px',
                borderColor: mode === ThemeMode.DARK ? 'dark.main' : 'primary.light',
                bgcolor: mode === ThemeMode.DARK ? 'dark.main' : 'background.paper'
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Total Records: {sortedPatients.length}</Typography>
                <TextField
                    label="Search Patients"
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ width: '30%' }}
                />
                <Box
                    sx={{
                        width: '20%',
                        borderColor: mode === ThemeMode.DARK ? 'dark.main' : 'primary.light',
                        bgcolor: mode === ThemeMode.DARK ? 'dark.main' : 'primary.light'
                    }}
                >
                    <FormControl fullWidth size="small">
                        <InputLabel>Sort By</InputLabel>
                        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <MenuItem value="name">Name</MenuItem>
                            <MenuItem value="age">Age</MenuItem>
                            <MenuItem value="lastVisit">Last Visit</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            <Grid
                container
                spacing={2}
                sx={{
                    borderColor: mode === ThemeMode.DARK ? 'dark.main' : 'primary.light'
                }}
            >
                {loading ? (
                    <Grid item xs={12} textAlign="center">
                        <CircularProgress />
                        <Typography variant="body1">Loading patients...</Typography>
                    </Grid>
                ) : sortedPatients.length > 0 ? (
                    sortedPatients.map((patient) => (
                        <Grid item xs={12} key={patient.patientId}>
                            <PatientCard patient={patient} />
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12} textAlign="center">
                        <Typography variant="body1">No patients found for {filter}.</Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default Profile;
