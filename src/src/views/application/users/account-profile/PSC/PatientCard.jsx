import React, { useEffect, useState, memo } from 'react';
import {
    Card, CardContent, Typography, Grid, Avatar, IconButton, Box, Tooltip, Dialog, Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArticleIcon from '@mui/icons-material/Article';
import BloodPressureIcon from 'src/assets/images/patients/blood-pressure.png';
import HeartRateIcon from 'src/assets/images/patients/cardiogram.png';
import WeightIcon from 'src/assets/images/patients/weight.png';
import SpO2Icon from 'src/assets/images/patients/blood.png';
import HeightIcon from 'src/assets/images/patients/height.png';
import HbA1cIcon from 'src/assets/images/patients/sugar.png';
import BMIIcon from 'src/assets/images/patients/bmi.png';
import ActivityIcon from 'src/assets/images/patients/exercise.png';
import { ThemeMode } from 'config';
import useConfig from 'src/hooks/useConfig';
import PatientDetails from './PatientDetails';

const formatLastUpdated = (minutes) => {
    if (minutes < 60) {
        return `Last Updated: ${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (minutes < 1440) {
        const hours = Math.floor(minutes / 60);
        return `Last Updated: ${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
        const days = Math.floor(minutes / 1440);
        return `Last Updated: ${days} day${days !== 1 ? 's' : ''} ago`;
    }
};


const PatientCard = memo(({ patient, isBookmarked, onBookmarkClick }) => {
    const theme = useTheme();
    const { mode } = useConfig();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    // console.log("Rendering PatientCard:", patient.patientId, isBookmarked);

    // Modal State
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nameModel, setNameModel] = useState(false);

    const handleView = async () => {
        setIsModalOpen(true);
        try {
            // const serviceToken = window.localStorage.getItem('serviceToken');
            // const response = await fetch(`https://myavawebapi.azurewebsites.net/api/Patient/GetPatientDetails/${patientId}`, {
            //     method: 'GET',
            //     headers: {
            //         Authorization: `Bearer ${serviceToken}`,
            //         'Content-Type': 'application/json'
            //     }
            // });
            // const data = await response.json();
            // if (data.status) {
            //     setSelectedPatient(patient);
            // }
            setSelectedPatient(patient);
        } catch (error) {
            console.error('Error fetching patient details:', error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPatient(null);
    };


    const handleNameOpenDialog = () => {
        setNameModel(true);
    };

    const handleNameCloseDialog = () => {
        setNameModel(false);
    };




    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                borderRadius: 5,
                bgcolor: mode === ThemeMode.DARK ? 'dark.main' : 'primary.light',
                padding: '0px'
            }}
        >
            <Card
                sx={{
                    bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'grey.50',
                    borderRadius: 5,
                    padding: '5px',
                    position: 'relative',
                    border: '1px solid',
                    boxShadow: 0.5,
                    borderColor: theme.palette.mode === ThemeMode.DARK ? 'primary.light' : 'grey.600',
                    transition: '0.3s',
                    '&:hover': { boxShadow: 4 }
                }}
            >
                <Tooltip title="Bookmark" placement="top">
                    <IconButton
                        aria-label="bookmark"
                        size="small"
                        onClick={() => onBookmarkClick(patient.patientId)}
                    >
                        {isBookmarked ? <BookmarkBorderIcon sx={{ color: "gold" }} /> : <BookmarkBorderIcon />}
                    </IconButton>
                </Tooltip>

                <Tooltip title="Edit" placement="top">
                    <IconButton aria-label="edit" size="small" sx={{ position: 'absolute', top: 4, right: 7 }}>
                        <EditNoteRoundedIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="View" placement="top">
                    <IconButton
                        aria-label="view"
                        size="small"
                        sx={{ position: 'absolute', top: 4, right: 40 }}
                        onClick={() => handleView(patient.patientId)}
                    >
                        <ArticleIcon sx={{ fontSize: 18, mt: 0.2 }} />
                    </IconButton>
                </Tooltip>


                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        gap: '12px',
                        paddingBottom: '2px',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between'
                    }}
                >
                    {/* Avatar and Name */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            width: { xs: '100%', sm: 'auto' },
                            justifyContent: { xs: 'center', sm: 'flex-start' },
                            flexWrap: 'wrap'
                        }}
                    >
                        <Avatar sx={{ width: 50, height: 50, background: '#21AAF3', color: '#FFFFFF' }}>
                            <Typography variant="h4" color="white">
                                {patient.firstName.charAt(0)}
                                {patient.lastName.charAt(0)}
                            </Typography>
                        </Avatar>
                        <Box sx={{ minWidth: '160px', flexShrink: 0, textAlign: { xs: 'center', sm: 'left' } }}>
                            <Typography
                                variant="subtitle1"
                                noWrap
                                sx={{ cursor: "pointer", color: "#1e88e5", "&:hover": { color: "blue" } }}
                                onClick={handleNameOpenDialog} // Open dialog on click
                            >
                                {patient.fullName}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                Age: {patient.age} | Gender: {patient.gender.charAt(0) === "F" ? "Female" : "Male"}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                ID: {patient.patientId}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Patient Info Icons */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            flexWrap: 'wrap',
                            justifyContent: { xs: 'center', sm: 'flex-start' },
                            width: { xs: '100%', sm: 'auto' }
                        }}
                    >
                        {[
                            { src: BloodPressureIcon, label: 'BP', value: patient.bp },
                            { src: HeartRateIcon, label: 'Pulse', value: patient.pulse },
                            { src: WeightIcon, label: 'Weight', value: `${patient.weight} kg` },
                            { src: SpO2Icon, label: 'SpO2', value: patient.spO2 },
                            { src: HeightIcon, label: 'Height', value: `${patient.height} cm` },
                            { src: HbA1cIcon, label: 'HbA1c', value: patient.hbA1c },
                            { src: BMIIcon, label: 'BMI', value: '--' },
                            { src: ActivityIcon, label: 'Activity', value: patient.activity }
                        ].map((item, index) => (
                            <Box key={index} sx={{ textAlign: 'center', minWidth: '60px' }}>
                                <Tooltip title={item.label} placement="top">
                                    <img
                                        src={item.src}
                                        alt={item.label}
                                        style={{
                                            width: 18,
                                            height: 18
                                        }}
                                    />
                                </Tooltip>
                                <Typography variant="caption" display="block">
                                    {item.value}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Last Notes Section */}
                    <Box
                        sx={{
                            bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'primary.light',
                            padding: '8px',
                            borderRadius: '6px',
                            border: '1px solid #d1d3e2',
                            minWidth: { xs: '100%', sm: '250px' },
                            maxWidth: '300px',
                            flexShrink: 0,
                            textAlign: 'left'
                        }}
                    >
                        <Typography variant="body2" fontWeight="bold">
                            Last Notes:
                        </Typography>
                        <Typography variant="caption" color="textSecondary" noWrap>
                            {patient.latestNotes} - Spoke to patient
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                            <Typography variant="caption" color="error">
                                {formatLastUpdated(patient.lastUpdatedInMinute)}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                00:01:19
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>


            </Card>

            {/* Patient Details Modal */}
            <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="xl">
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <span>Patient Details for {patient?.fullName}</span>
                        <Button onClick={handleCloseModal}  >
                            X
                        </Button>
                    </Box>
                </DialogTitle>

                <DialogContent dividers>
                    {selectedPatient ? (
                        <>
                            <PatientDetails patient={patient} />
                        </>
                    ) : (
                        <Typography>Loading patient details...</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="secondary" variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>









            {/* name model open */}
            <Dialog
                open={nameModel}
                onClose={handleNameCloseDialog}
                fullWidth={true}
                maxWidth="md"
                fullScreen={isMobile}
            >

                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <span>Patient Details for {patient?.fullName}</span>
                        <Button onClick={handleNameCloseDialog}  >
                            X
                        </Button>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ padding: '20px' }}>
                    <Grid container spacing={3}>
                        {/* Patient Info Section */}
                        <Grid item xs={12} md={6}>
                            <Card elevation={3} sx={{ marginBottom: '20px' }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: '15px' }}>
                                        Patient Info
                                    </Typography>
                                    <Divider sx={{ marginBottom: '15px' }} />
                                    <Box marginBottom="8px">
                                        <Typography><strong>Patient Name:</strong> {patient.fullName}</Typography>
                                    </Box>
                                    <Box marginBottom="8px">
                                        <Typography><strong>Current Status:</strong> {patient.status}</Typography>
                                    </Box>
                                    <Box marginBottom="8px">
                                        <Typography><strong>Contact Number:</strong> {patient.contact || "-"}</Typography>
                                    </Box>
                                    <Box marginBottom="8px">
                                        <Typography><strong>Chronic Conditions:</strong> {patient.conditions || "-"}</Typography>
                                    </Box>
                                    <Box marginBottom="8px">
                                        <Typography><strong>L/Last Admit:</strong> {patient.lastAdmit || "-"}</Typography>
                                    </Box>
                                    <Box marginBottom="8px">
                                        <Typography><strong>Primary PPC:</strong> {patient.primaryPPC || "-"}</Typography>
                                    </Box>
                                    <Box marginBottom="8px">
                                        <Typography><strong>Primary Doctor:</strong> {patient.primaryDoctor || "-"}</Typography>
                                    </Box>
                                    <Box marginBottom="8px">
                                        <Typography><strong>HA (Hospital Admission):</strong> {patient.hospitalAdmission || "-"}</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Vital Info Section */}
                        <Grid item xs={12} md={6}>
                            <Card elevation={3}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: '15px' }}>
                                        Vital Info
                                    </Typography>
                                    <Divider sx={{ marginBottom: '15px' }} />
                                    <Grid container sx={{ marginBottom: '10px' }}>
                                        <Grid item xs={6}><strong>Vital Name</strong></Grid>
                                        <Grid item xs={3}><strong>Vital Value</strong></Grid>
                                        <Grid item xs={3}><strong>Last Update On</strong></Grid>
                                    </Grid>
                                    <Divider sx={{ marginBottom: '10px' }} />
                                    {[
                                        { name: "Height", value: patient?.height || "-", date: "-" },
                                        { name: "Weight", value: patient?.weight || "-", date: "-" },
                                        { name: "Body Mass", value: patient?.bmi || "-", date: "-" },
                                        { name: "Pulse", value: patient?.pulse || "-", date: "-" },
                                        { name: "Temperature", value: patient?.temperature || "-", date: "-" },
                                        { name: "Blood Pressure", value: patient?.bloodPressure || "14/97 mm Hg", date: "07/28/2022" },
                                        { name: "Glucose", value: patient?.glucose || "-", date: "-" },
                                        { name: "SpO2", value: patient?.spo2 || "-", date: "-" }
                                    ].map((vital, index) => (
                                        <Grid container key={index} sx={{ marginBottom: '8px' }}>
                                            <Grid item xs={6}>{vital.name}</Grid>
                                            <Grid item xs={3}>{vital.value}</Grid>
                                            <Grid item xs={3}>{vital.date}</Grid>
                                        </Grid>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ padding: '20px' }}>
                    <Button onClick={handleNameCloseDialog} color="primary" variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
});

export default PatientCard;
