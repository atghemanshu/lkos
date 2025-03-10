import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
    Grid, CircularProgress, Typography,
    Box, TextField, List, ListItemText, ListItem,
    MenuItem, Select, InputLabel, FormControl, Modal,
    Dialog, DialogTitle, DialogActions, Button, DialogContent
} from '@mui/material';
import PatientCard from './PatientCard';
import { ThemeMode } from 'config';
import useConfig from 'src/hooks/useConfig';
import { useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
// import { PlayArrow, Replay, Close } from '@mui/icons-material';
import { PlayArrow, Pause, Replay, Save, Close } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import ChangePassword from './ChangePassword';



const Profile = ({ filter }) => {
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
    const openRightSectionRef = useRef(openRightSection);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [openChangePassModal, setOpenChangePassModal] = useState(false);



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


    useEffect(() => {
        openRightSectionRef.current = openRightSection;
    }, [openRightSection]);

    // Inside the PatientList component
    const handleBookmarkClick = useCallback((id) => {
        console.log(openRightSectionRef.current);

        if (openRightSectionRef.current) {
            alert("You must save the current patient time first.");
            return false;
        }
        setBookmarkedId(prevId => (prevId === id ? null : id));
        setSelectedPatient(patients.find(p => p.patientId === id));
        setOpenMiddlePopup(true);
        setOpenRightSection(true);
    }, [patients]); // ❌ Removed openRightSection from dependencies

    const handleTimeButtonClick = () => {
        setOpenRightSection(true);
        setIsRunning(true); // ✅ Start without resetting timer
        setOpenMiddlePopup(false);
    };

    const handleCloseRightSection = () => {
        setOpenRightSection(false);
        setIsRunning(false); // Stop timer when closing the section
    };

    const handleRestartButtonClick = () => {
        setTimer(0);
        setIsRunning(true);
        setOpenMiddlePopup(false);
    };

    const handleCloseButtonClick = () => {
        setIsRunning(false);
        setOpenMiddlePopup(false);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    //for right side buttons
    const handleButtonClick = (text) => {
        if (text === "Change Password") {
            setOpenChangePassModal(true);
        } else {
            console.log(`${text} clicked`); // Handle other button clicks
        }
    };


    return (
        <>
            <Box sx={{ display: "flex", height: "150vh", overflow: "hidden" }}>
                {/* Left Column (Patient List) */}
                <Box
                    sx={{
                        flex: openRightSection ? 2 : 1,
                        transition: "flex 0.3s ease-in-out",
                        height: "120vh",
                        overflowY: "auto",
                        padding: "10px",
                        bgcolor: mode === ThemeMode.DARK ? "dark.main" : "background.paper",
                        maxWidth: openRightSection ? '85%' : '100%'
                    }}
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        flexWrap="wrap" // Ensures wrapping on small screens
                        gap={2} // Adds spacing when stacked
                        mb={2}
                        sx={{
                            flexDirection: { xs: "column", sm: "row" }, // Stack on mobile, row on larger screens
                        }}
                    >
                        {/* Total Records */}
                        <Typography variant="h6" sx={{ textAlign: { xs: "center", sm: "left" } }}>
                            Total Records: {sortedPatients.length}
                        </Typography>

                        {/* Search Input */}
                        <TextField
                            label="Search Patients"
                            variant="outlined"
                            size="small"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{
                                width: { xs: "100%", sm: "30%" }, // Full width on mobile, 30% on larger screens
                            }}
                        />

                        {/* Sort Dropdown */}
                        <Box
                            sx={{
                                width: { xs: "100%", sm: "20%" }, // Full width on mobile, 20% on larger screens
                                borderColor: (theme) => theme.palette.mode === ThemeMode.DARK ? "dark.main" : "primary.light",
                                bgcolor: (theme) => theme.palette.mode === ThemeMode.DARK ? "dark.main" : "primary.light",
                            }}
                        >
                            <FormControl fullWidth size="small">
                                <InputLabel>Sort By</InputLabel>
                                <Select sx={{ mt: 1 }} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                    <MenuItem value="name">Name</MenuItem>
                                    <MenuItem value="age">Age</MenuItem>
                                    <MenuItem value="lastVisit">Last Visit</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>


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
                                <Typography variant="body1">No patients found.</Typography>
                            </Grid>
                        )}
                    </Grid>
                </Box>

                {/* Right Sidebar (Fixed Position) */}
                {openRightSection && (
                    <Box
                        sx={{
                            width: 320, // Default for Web
                            height: 720,
                            bgcolor: "#f8fafc",
                            padding: 2,
                            boxShadow: "-3px 0px 5px rgba(0, 0, 0, 0.2)",
                            position: "fixed",
                            right: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 1300,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            borderRadius: "10px",
                            overflow: "hidden",
                            mt: 10,

                            // Mobile View Styles
                            "@media (max-width: 600px)": {
                                width: "100%", // Full width
                                height: "100vh", // Fixed height
                                top: "auto",
                                bottom: 0,
                                right: 0,
                                transform: "none", // No vertical centering
                                borderRadius: "20px 20px 0 0", // Rounded top corners
                                boxShadow: "0px -5px 10px rgba(0, 0, 0, 0.2)", // Soft top shadow
                                animation: "slideUp 0.3s ease-in-out",
                            },

                            "@keyframes slideUp": {
                                from: { transform: "translateY(100%)" },
                                to: { transform: "translateY(0)" },
                            },
                        }}
                    >
                        {/* Timer & Control Icons */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, position: "absolute", top: 8, left: 8 }}>
                            <Typography sx={{ color: "red", fontWeight: "bold" }}>{formatTime(timer)}</Typography>

                            <IconButton
                                onClick={handleTimeButtonClick}
                                sx={{
                                    bgcolor: "green",
                                    color: "white",
                                    width: 35,
                                    height: 35,
                                    opacity: isRunning ? 0.3 : 1,
                                    "&:hover": { bgcolor: "darkgreen" },
                                }}
                            >
                                <PlayArrow fontSize="small" />
                            </IconButton>

                            <IconButton
                                onClick={handleCloseButtonClick}
                                sx={{
                                    bgcolor: "darkorange",
                                    color: "white",
                                    width: 35,
                                    height: 35,
                                    opacity: isRunning ? 1 : 0.4,
                                    "&:hover": { bgcolor: "darkorange" },
                                }}
                            >
                                <Pause fontSize="small" />
                            </IconButton>

                            <IconButton
                                onClick={handleRestartButtonClick}
                                sx={{
                                    bgcolor: "blue",
                                    color: "white",
                                    width: 35,
                                    height: 35,
                                    "&:hover": { bgcolor: "darkblue" },
                                }}
                            >
                                <Replay fontSize="small" />
                            </IconButton>

                            <IconButton
                                onClick={() => console.log(`Saved time: ${formatTime(timer)}`)}
                                sx={{
                                    bgcolor: "purple",
                                    color: "white",
                                    width: 35,
                                    height: 35,
                                    "&:hover": { bgcolor: "purple" },
                                }}
                            >
                                <Save fontSize="small" />
                            </IconButton>
                        </Box>

                        {/* Close Button */}
                        <IconButton
                            onClick={handleCloseRightSection}
                            sx={{
                                position: "absolute",
                                top: 8,
                                right: 1,
                                bgcolor: "red",
                                color: "white",
                                width: 35,
                                height: 35,
                                "&:hover": { bgcolor: "darkred" },
                            }}
                        >
                            <Close fontSize="small" />
                        </IconButton>

                        {/* Profile Image */}
                        <Box sx={{ width: 100, height: 100, borderRadius: "50%", overflow: "hidden", mt: 4 }}>
                            <img
                                src="/src/assets/images/users/user-round.svg"
                                alt="Profile"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </Box>

                        {/* Name */}
                        <Typography variant="h6" sx={{ color: "#007bff", fontWeight: "bold", mt: 1 }}>
                            {selectedPatient.fullName}
                        </Typography>

                        {/* Scrollable Menu List */}
                        <Box sx={{ width: "100%", flex: 1, overflowY: "auto", mt: 2 }}>
                            <List sx={{ width: "100%" }}>
                                {[
                                    "Change Password",
                                    "Edit Profile",
                                    "Emergency Info",
                                    "Sponsors",
                                    "Medication",
                                    "Patient History",
                                    "Life Card",
                                    "SVC Notes",
                                    "SVC Docs",
                                    "Tele Health",
                                ].map((text, index) => (
                                    <ListItem key={index} sx={{ borderBottom: "1px solid #ddd", padding: 1 }}>
                                        <Button
                                            // variant="contained"
                                            // fullWidth
                                            onClick={() => handleButtonClick(text)}
                                        >
                                            {text}
                                        </Button>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        <Button variant="contained" color="secondary" onClick={handleCloseRightSection} sx={{ mt: 2 }}>
                            Close
                        </Button>
                    </Box>
                )}


            </Box>

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
                        sx={{ bgcolor: "darkorange", color: 'white', width: 50, height: 50, '&:hover': { bgcolor: 'darkred' } }}
                    >
                        <Pause />
                    </IconButton>

                </DialogActions>
            </Dialog>



            {/* Change Password Modal */}
            <Modal open={openChangePassModal} onClose={() => setOpenChangePassModal(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        // Use theme and media query for responsive width
                        width: (theme) => {
                            const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
                            const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

                            if (isSmallScreen) return "90%"; // Mobile
                            if (isMediumScreen) return "60%"; // Tablets & small desktops
                            return "400px"; // Larger screens
                        },
                        maxWidth: '90%', // Ensure it doesn't exceed the screen width on smaller devices
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 2,
                        position: 'relative',
                    }}
                >
                    {/* Cross (X) Button at the Top Right */}
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpenChangePassModal(false)}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                        }}
                    >
                        X
                    </IconButton>
                    <br></br>
                    <br></br>

                    <ChangePassword setOpenChangePassModal={setOpenChangePassModal} />

                    {/* Close Button at the Bottom */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button variant="outlined" onClick={() => setOpenChangePassModal(false)}>
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>

        </>


    );
};

export default Profile;
