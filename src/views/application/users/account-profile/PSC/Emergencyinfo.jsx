import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Button, Grid, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EmergencyInfo = () => {
    const [openPanels, setOpenPanels] = useState([]);
    const handleToggle = (panel) => {
        setOpenPanels((prev) =>
            prev.includes(panel) ? prev.filter((p) => p !== panel) : [...prev, panel]
        );
    };

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', padding: 3, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Patient Emergency Info</Typography>

            {/* Emergency Contact */}
            <Accordion expanded={openPanels.includes('emergency')} onChange={() => handleToggle('emergency')}
                sx={{ marginBottom: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}> <Typography sx={{ fontWeight: 'bold' }}>Emergency Contact</Typography> </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}><TextField fullWidth label="Name" size="small" /></Grid>
                        <Grid item xs={12}><TextField fullWidth label="Relationship" size="small" /></Grid>
                        <Grid item xs={12}><TextField fullWidth label="Mobile" size="small" /></Grid>
                        <Grid item xs={12}><TextField fullWidth label="Email" size="small" /></Grid>
                        <Grid item xs={12}><TextField fullWidth label="Address" size="small" /></Grid>
                        <Grid item xs={12}><FormControl><FormLabel>Consent</FormLabel>
                            <RadioGroup row>
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl></Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Vaccine */}
            <Accordion expanded={openPanels.includes('vaccine')} onChange={() => handleToggle('vaccine')} sx={{ marginBottom: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{ fontWeight: 'bold' }}>Vaccine</Typography></AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}><TextField fullWidth label="Vaccine Type" size="small" /></Grid>
                        <Grid item xs={12}><FormControl><FormLabel>Consent</FormLabel>
                            <RadioGroup row>
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl></Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* PSA Test */}
            <Accordion expanded={openPanels.includes('psaTest')} onChange={() => handleToggle('psaTest')} sx={{ marginBottom: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{ fontWeight: 'bold' }}>PSA Test</Typography></AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}><TextField fullWidth label="Test Title" size="small" /></Grid>
                        <Grid item xs={12}><FormControl><FormLabel>Consent</FormLabel>
                            <RadioGroup row>
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl></Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Chronic Condition */}
            <Accordion expanded={openPanels.includes('chronicCondition')} onChange={() => handleToggle('chronicCondition')} sx={{ marginBottom: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 'bold' }}>Chronic Condition</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}><TextField fullWidth label="Condition Title" size="small" /></Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel>Consent</FormLabel>
                                <RadioGroup row>
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Vital Reminder */}
            <Accordion expanded={openPanels.includes('vitalReminder')} onChange={() => handleToggle('vitalReminder')} sx={{ marginBottom: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 'bold' }}>Vital Reminder</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}><TextField fullWidth label="Reminder Title" size="small" /></Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel>Consent</FormLabel>
                                <RadioGroup row>
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>


            {/* Patient Risk */}
            <Accordion expanded={openPanels.includes('risk')} onChange={() => handleToggle('risk')} sx={{ marginBottom: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{ fontWeight: 'bold' }}>Patient Risk</Typography></AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}><TextField fullWidth label="Risk Description" size="small" /></Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Other Care */}
            <Accordion expanded={openPanels.includes('otherCare')} onChange={() => handleToggle('otherCare')} sx={{ marginBottom: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{ fontWeight: 'bold' }}>Other Care</Typography></AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}><TextField fullWidth label="Other Care Details" size="small" /></Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Medical Alert */}
            <Accordion expanded={openPanels.includes('medAlert')} onChange={() => handleToggle('medAlert')} sx={{ marginBottom: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{ fontWeight: 'bold' }}>Medical Alert</Typography></AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}><TextField fullWidth label="Alert Details" size="small" /></Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Submit Button */}
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => console.log("Form Submitted")}>
                Submit
            </Button>
        </Box>
    );
};

export default EmergencyInfo;
