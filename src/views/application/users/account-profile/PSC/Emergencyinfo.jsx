import React, { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Modal,
    Checkbox,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    Button,
    Grid,
    Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EmergencyInfo = () => {
    const [openPanels, setOpenPanels] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        emergency: {
            name: '',
            relationship: '',
            mobile: '',
            email: '',
            address: '',
            sendAlert: 'no',
        },
        vaccine: {
            setReminder: 'no',
        },
        psaTest: {
            testTitle: '',
            setReminder: 'no',
        },
        chronicCondition: {
            conditionTitle: '',
            hasCondition: 'no',
        },
        vitalReminder: {
            reminderTitle: '',
            setReminder: 'no',
        },
        risk: {
            riskDescription: '',
        },
        consents: {
            consentsDescription: '',
        },
        // otherCare: {
        //     careTeam: [
        //         { name: 'Amit Mishra (amit)', checked: true, primary: true, emailAlert: true, smsAlert: true },
        //         { name: 'Anna Conklin (AConk)', checked: false, primary: false, emailAlert: true, smsAlert: false },
        //         { name: 'Brian Goldstein (BGold)', checked: false, primary: false, emailAlert: false, smsAlert: false },
        //         { name: 'Harika Ramshetty (Harika)', checked: false, primary: false, emailAlert: false, smsAlert: false },
        //     ],
        // },
        medAlert: {
            reminderTitle: '',
            requiredAlert: 'no',
        },
    });

    const [members, setMembers] = useState([
        { name: 'Amit Mishra (amit)', checked: true, primary: true, emailAlert: true, smsAlert: true },
        { name: 'Anna Conklin (AConk)', checked: false, primary: false, emailAlert: true, smsAlert: false },
        { name: 'Brian Goldstein (BGold)', checked: false, primary: false, emailAlert: false, smsAlert: false },
        { name: 'Harika Ramshetty (Harika)', checked: false, primary: false, emailAlert: false, smsAlert: false },
    ]);

    const handleCheckboxChange = (name, checked) => {
        setMembers((prevMembers) =>
            prevMembers.map((member) =>
                member.name === name
                    ? { ...member, checked, primary: checked, emailAlert: checked, smsAlert: checked }
                    : member
            )
        );
    };


    const handleMemberFieldChange = (name, field, value) => {
        setMembers((prev) =>
            prev.map((member) => (member.name === name ? { ...member, [field]: value } : member))
        );
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handleToggle = (panel) => {
        setOpenPanels((prev) =>
            prev.includes(panel) ? prev.filter((p) => p !== panel) : [...prev, panel]
        );
    };

    const handleInputChange = (panel, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [panel]: {
                ...prev[panel],
                [field]: value,
            },
        }));
    };

    const handleRadioChange = (panel, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [panel]: {
                ...prev[panel],
                [field]: value,
            },
        }));
    };

    // const handleCheckboxChange = (name, checked) => {
    //     setFormData((prev) => ({
    //         ...prev,
    //         otherCare: {
    //             ...prev.otherCare,
    //             careTeam: checked
    //                 ? [...prev.otherCare.careTeam, name]
    //                 : prev.otherCare.careTeam.filter((member) => member !== name),
    //         },
    //     }));
    // };

    // const handleMemberFieldChange = (memberName, field, value) => {
    //     setFormData((prev) => ({
    //       ...prev,
    //       otherCare: {
    //         ...prev.otherCare,
    //         careTeam: prev.otherCare.careTeam.map((member) =>
    //           member.name === memberName ? { ...member, [field]: value } : member
    //         ),
    //       },
    //     }));
    //   };

    const handleSubmit = () => {
        console.log(formData, members);
    };

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', padding: 3, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Patient Emergency Info
            </Typography>

            {/* Emergency Contact */}
            <Accordion
                expanded={openPanels.includes('emergency')}
                onChange={() => handleToggle('emergency')}
                sx={{ marginBottom: 2 }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 'bold' }}>Emergency Contact</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Name"
                                size="small"
                                value={formData.emergency.name}
                                onChange={(e) => handleInputChange('emergency', 'name', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Relationship"
                                size="small"
                                value={formData.emergency.relationship}
                                onChange={(e) => handleInputChange('emergency', 'relationship', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Mobile"
                                size="small"
                                value={formData.emergency.mobile}
                                onChange={(e) => handleInputChange('emergency', 'mobile', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Email"
                                size="small"
                                value={formData.emergency.email}
                                onChange={(e) => handleInputChange('emergency', 'email', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                label="Address"
                                size="small"
                                value={formData.emergency.address}
                                onChange={(e) => handleInputChange('emergency', 'address', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel>Do you want to send alert?</FormLabel>
                                <RadioGroup
                                    row
                                    value={formData.emergency.sendAlert}
                                    onChange={(e) => handleRadioChange('emergency', 'sendAlert', e.target.value)}
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Vaccine */}
            <Accordion
                expanded={openPanels.includes('vaccine')}
                onChange={() => handleToggle('vaccine')}
                sx={{ marginBottom: 2 }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 'bold' }}>Vaccine</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel>Do you want to set vaccine reminder?</FormLabel>
                                <RadioGroup
                                    row
                                    value={formData.vaccine.setReminder}
                                    onChange={(e) => handleRadioChange('vaccine', 'setReminder', e.target.value)}
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* PSA Test */}
            <Accordion
                expanded={openPanels.includes('psaTest')}
                onChange={() => handleToggle('psaTest')}
                sx={{ marginBottom: 2 }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 'bold' }}>PSA Test</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {/* <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Test Title"
                                size="small"
                                value={formData.psaTest.testTitle}
                                onChange={(e) => handleInputChange('psaTest', 'testTitle', e.target.value)}
                            />
                        </Grid> */}
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel>Do you want to set test reminder?</FormLabel>
                                <RadioGroup
                                    row
                                    value={formData.psaTest.setReminder}
                                    onChange={(e) => handleRadioChange('psaTest', 'setReminder', e.target.value)}
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Chronic Condition */}
            <Accordion
                expanded={openPanels.includes('chronicCondition')}
                onChange={() => handleToggle('chronicCondition')}
                sx={{ marginBottom: 2 }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 'bold' }}>Chronic Condition</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel>Do you have any chronic medical condition?</FormLabel>
                                <RadioGroup
                                    row
                                    value={formData.chronicCondition.hasCondition}
                                    onChange={(e) => handleRadioChange('chronicCondition', 'hasCondition', e.target.value)}
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Vital Reminder */}
            <Accordion
                expanded={openPanels.includes('vitalReminder')}
                onChange={() => handleToggle('vitalReminder')}
                sx={{ marginBottom: 2 }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 'bold' }}>Vital Reminder</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {/* <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Reminder Title"
                                size="small"
                                value={formData.vitalReminder.reminderTitle}
                                onChange={(e) => handleInputChange('vitalReminder', 'reminderTitle', e.target.value)}
                            />
                        </Grid> */}
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel>Do you want to set vital reminder?</FormLabel>
                                <RadioGroup
                                    row
                                    value={formData.vitalReminder.setReminder}
                                    onChange={(e) => handleRadioChange('vitalReminder', 'setReminder', e.target.value)}
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Patient Risk */}
            <Accordion
                expanded={openPanels.includes('risk')}
                onChange={() => handleToggle('risk')}
                sx={{ marginBottom: 2 }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 'bold' }}>Patient risk level</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Risk Description"
                                size="small"
                                value={formData.risk.riskDescription}
                                onChange={(e) => handleInputChange('risk', 'riskDescription', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            {/* consents */}
            <Accordion
                expanded={openPanels.includes('consents')}
                onChange={() => handleToggle('consents')}
                sx={{ marginBottom: 2 }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 'bold' }}>Patient consents</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="consents Description"
                                size="small"
                                value={formData.consents.consentsDescription}
                                onChange={(e) => handleInputChange('consents', 'consentsDescription', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Other Care */}
            <Accordion
                expanded={openPanels.includes('otherCare')}
                onChange={() => handleToggle('otherCare')}
                sx={{ marginBottom: 2 }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 'bold' }}>Other Care</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button variant="contained" onClick={handleOpenModal}>
                                Assign
                            </Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Modal for Assign Care Team */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Assign Care Team
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search Clinical Team"
                        sx={{ mb: 2 }}
                    />
                    <Grid container spacing={1} sx={{ overflowY: 'auto', maxHeight: 300 }}>
                        {members.map((member, index) => (
                            <Grid item xs={12} container alignItems="center" key={index}>
                                <Grid item xs={4}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={member.checked}
                                                onChange={(e) => handleCheckboxChange(member.name, e.target.checked)}
                                            />
                                        }
                                        label={member.name}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Checkbox
                                        checked={member.checked ? true : member.primary}
                                        onChange={(e) => handleMemberFieldChange(member.name, 'primary', e.target.checked)}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Checkbox
                                        checked={member.checked ? true : member.emailAlert}
                                        onChange={(e) => handleMemberFieldChange(member.name, 'emailAlert', e.target.checked)}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Checkbox
                                        checked={member.checked ? true : member.smsAlert}
                                        onChange={(e) => handleMemberFieldChange(member.name, 'smsAlert', e.target.checked)}
                                    />
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button onClick={handleCloseModal} variant="contained">
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>


            {/* Medical Alert */}
            <Accordion
                expanded={openPanels.includes('medAlert')}
                onChange={() => handleToggle('medAlert')}
                sx={{ marginBottom: 2 }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 'bold' }}>Medical Alert</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {/* <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Reminder Title"
                                size="small"
                                value={formData.medAlert.reminderTitle}
                                onChange={(e) => handleInputChange('medAlert', 'reminderTitle', e.target.value)}
                            />
                        </Grid> */}
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel>Do you require any medical alert?</FormLabel>
                                <RadioGroup
                                    row
                                    value={formData.medAlert.requiredAlert}
                                    onChange={(e) => handleRadioChange('medAlert', 'requiredAlert', e.target.value)}
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Submit Button */}
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
                Final Submit
            </Button>
        </Box>
    );
};

export default EmergencyInfo;