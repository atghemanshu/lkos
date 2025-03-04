import React, { useEffect, useState, useCallback } from 'react';
import {
    Grid, CircularProgress, Typography,
    Box, TextField, List, ListItemText, ListItem,
    MenuItem, Select, InputLabel, FormControl,
    Dialog, DialogTitle, DialogActions, Button, DialogContent
} from '@mui/material';
import PatientCard from './PatientCard';
import { ThemeMode } from 'config';
import useConfig from 'src/hooks/useConfig';
import { useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { PlayArrow, Replay, Close } from '@mui/icons-material';

const PatientList = ({ filter }) => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const { mode } = useConfig();
    const theme = useTheme();
    const [bookmarkedId, setBookmarkedId] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [openMiddlePopup, setOpenMiddlePopup] = useState(false);
    const [openRightSection, setOpenRightSection] = useState(false);

    // Timer State
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);


    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const user = localStorage.getItem('user');
                let StaffUserId = user ? JSON.parse(user).userId : '';
                const serviceToken = window.localStorage.getItem('serviceToken');
                const response = await fetch(`https://myavawebapi.azurewebsites.net/api/Patient/GetAllPatients`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${serviceToken}`,
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

    // const handleBookmarkClick = (id) => {
    //     setBookmarkedId(prevId => (prevId === id ? null : id));
    //     setSelectedPatient(patients.find(p => p.patientId === id));
    //     setOpenMiddlePopup(true);
    // };

    // Inside the PatientList component
    const handleBookmarkClick = useCallback((id) => {
        setBookmarkedId(prevId => (prevId === id ? null : id));
        setSelectedPatient(patients.find(p => p.patientId === id));
        setOpenMiddlePopup(true);
    }, [patients]); // Ensures the function is memoized and only changes when patients change

    const handleTimeButtonClick = () => {
        setOpenMiddlePopup(false);
        setOpenRightSection(true);
        setIsRunning(true);
        setTimer(0); // Reset timer when starting
    };

    const handleCloseRightSection = () => {
        setOpenRightSection(false);
        setIsRunning(false); // Stop timer when closing the section
    };

    const handleRestartButtonClick = () => {
        setTimer(0);
        setIsRunning(true);
    };

    const handleCloseButtonClick = () => {
        setIsRunning(false);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };



    return (
        <Box sx={{ height: '700px', overflowY: 'auto', padding: '10px', bgcolor: mode === ThemeMode.DARK ? 'dark.main' : 'background.paper' }}>
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
                <Box sx={{ width: '20%' }}>
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
            <Box display="flex" gap={2}>
                <Box sx={{ flex: openRightSection ? 2 : 1, transition: 'flex 0.3s' }}>
                    <Grid container spacing={2}>
                        {loading ? (
                            <Grid item xs={12} textAlign="center">
                                <CircularProgress />
                                <Typography variant="body1">Loading patients...</Typography>
                            </Grid>
                        ) : sortedPatients.length > 0 ? (
                            sortedPatients.map((patient) => (
                                <Grid item xs={12} key={patient.patientId}>
                                    <PatientCard
                                        patient={patient}
                                        isBookmarked={bookmarkedId === patient.patientId}
                                        onBookmarkClick={handleBookmarkClick}
                                    />

                                </Grid>
                            ))
                        ) : (
                            <Grid item xs={12} textAlign="center">
                                <Typography variant="body1">No patients found for {filter}.</Typography>
                            </Grid>
                        )}
                    </Grid>
                </Box>
               

            </Box>





            {/* First Popup (Middle) */}
            <Dialog
                open={openMiddlePopup}
                onClose={() => {
                    setOpenMiddlePopup(false);
                    setBookmarkedId(null);
                }}
                maxWidth="sm"
                fullWidth
            >

                <DialogTitle>
                    TIMECLOCK
                    <IconButton
                        onClick={() => setOpenMiddlePopup(false)}
                        sx={{ position: 'absolute', right: 8, top: 8, color: 'red' }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography>Select an action for patient: {selectedPatient?.fullName}</Typography>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <IconButton
                        onClick={handleTimeButtonClick}
                        sx={{ bgcolor: 'green', color: 'white', width: 50, height: 50, '&:hover': { bgcolor: 'darkgreen' } }}
                    >
                        <PlayArrow />
                    </IconButton>
                    <IconButton
                        onClick={handleRestartButtonClick}
                        sx={{ bgcolor: 'blue', color: 'white', width: 50, height: 50, '&:hover': { bgcolor: 'darkblue' } }}
                    >
                        <Replay />
                    </IconButton>
                    <IconButton
                        onClick={handleCloseButtonClick}
                        sx={{ bgcolor: 'red', color: 'white', width: 50, height: 50, '&:hover': { bgcolor: 'darkred' } }}
                    >
                        <Close />
                    </IconButton>
                </DialogActions>
            </Dialog>

        </Box >
    );
};

export default PatientList;
