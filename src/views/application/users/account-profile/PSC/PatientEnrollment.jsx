import React, { useState } from 'react';
import { Button, Container, Grid, Dialog, DialogContent, DialogTitle, DialogActions, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'utils/axios';
import MainCard from 'ui-component/cards/MainCard';
import 'src/styles.css'; // Import your CSS file here
import SinglePatientEnrollment from './SinglePatientEnrollment';

const PatientEnrollment = () => {
    const [openManual, setOpenManual] = useState(false);
    const [openUpload, setOpenUpload] = useState(false);

    return (
        <MainCard title="Patient Enrollment">
            <>
                {/* Buttons Layout */}
                <Grid container spacing={2} justifyContent="center" sx={{ p: 2 }}>
                    <Grid item xs={12} sm={5}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{
                                py: 2,
                                fontSize: "18px",
                                fontWeight: "bold",
                                backgroundColor: "#1976D2",
                                color: "#fff",
                                "&:hover": {
                                    backgroundColor: "#FFC107",
                                    color: "#000",
                                },
                            }}
                            onClick={() => setOpenManual(true)}
                        >
                            Manually
                        </Button>

                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: "#FFC107", color: "#000", py: 2, fontSize: "18px", fontWeight: "bold", "&:hover": {
                                    backgroundColor: "#1976D2",
                                    color: "#fff",
                                },
                            }}
                            onClick={() => setOpenUpload(true)}
                        >
                            Upload
                        </Button>
                    </Grid>
                </Grid>
                {/* Manually Popup */}
                <Dialog open={openManual} onClose={() => setOpenManual(false)} maxWidth="md" fullWidth>
                    <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6">Manually Enroll Patient</Typography>
                        <IconButton onClick={() => setOpenManual(false)}><CloseIcon /></IconButton>
                    </DialogTitle>
                    <DialogContent sx={{ maxHeight: "80vh", overflowY: "auto" }}>
                        <SinglePatientEnrollment />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={() => setOpenManual(false)}>Close</Button>
                    </DialogActions>
                </Dialog>

                {/* Upload Popup */}
                <Dialog open={openUpload} onClose={() => setOpenUpload(false)} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6">Upload Patient Data</Typography>
                        <IconButton onClick={() => setOpenUpload(false)}><CloseIcon /></IconButton>
                    </DialogTitle>
                    <DialogContent sx={{ maxHeight: "80vh", overflowY: "auto" }}>
                        <Typography variant="h6" textAlign="center">
                            This is a dummy body for Upload.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={() => setOpenUpload(false)}>Close</Button>
                    </DialogActions>
                </Dialog>

            </>
        </MainCard>
    );
};

export default PatientEnrollment;
