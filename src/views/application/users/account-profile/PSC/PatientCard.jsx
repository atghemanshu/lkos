import React, { useEffect, useState, memo } from 'react';
import {
    Card, CardContent, Typography, Grid, Avatar, IconButton, Box, Tooltip, Dialog, Button,
    DialogTitle,
    DialogContent,
    DialogActions
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
    // console.log("Rendering PatientCard:", patient.patientId, isBookmarked);

    // Modal State
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                        <ArticleIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                </Tooltip>



                <CardContent
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        paddingBottom: '2px',
                        flexWrap: 'nowrap',
                        justifyContent: 'space-between'
                    }}
                >
                    {/* Avatar and Name */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Avatar sx={{ width: 50, height: 50, background: '#21AAF3', color: '#FFFFFF' }}>
                            <Typography variant="h4" color="white">
                                {patient.firstName.charAt(0)}
                                {patient.lastName.charAt(0)}
                            </Typography>
                        </Avatar>
                        <Box sx={{ minWidth: '160px', flexShrink: 0 }}>
                            <Typography variant="subtitle1" noWrap>
                                {patient.fullName}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                Age: {patient.age} | Gender: {patient.gender.charAt(0) == "F" ? "Female" : "Male"} {" |   "}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                ID: {patient.patientId}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Patient Info Icons */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
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

                    {/* Last Notes Section - Full Right */}
                    <Box
                        sx={{
                            bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'primary.light',
                            padding: '8px',
                            borderRadius: '6px',
                            border: '1px solid #d1d3e2',
                            minWidth: '250px',
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
        </Box>
    );
});

export default PatientCard;
