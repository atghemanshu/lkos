import React, { useState } from "react";
import {
    Grid,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Typography
} from "@mui/material";

const ChangePassword = ({ setOpenChangePassModal }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    // Password Validation Function
    const validatePassword = (password) => {
        const errors = {};

        if (!password) {
            errors.required = "Password is required.";
        } else {
            if (password.length < 8) errors.length = "Minimum 8 characters required.";
            if (!/[a-z]/.test(password)) errors.lowercase = "At least 1 lowercase letter required.";
            if (!/[A-Z]/.test(password)) errors.uppercase = "At least 1 uppercase letter required.";
            if (!/[0-9]/.test(password)) errors.number = "At least 1 number required.";
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.special = "At least 1 special character required.";
        }

        return errors;
    };

    // Form Validation Before Submission
    const handleSubmit = () => {
        let newErrors = {};

        // Validate Old Password (Required)
        if (!currentPassword) {
            newErrors.currentPassword = "Old Password is required.";
        }

        // Validate New Password
        const newPasswordErrors = validatePassword(newPassword);
        if (Object.keys(newPasswordErrors).length > 0) {
            newErrors.newPassword = newPasswordErrors;
        }

        // Confirm Password Check
        if (confirmPassword !== newPassword) {
            newErrors.confirmPassword = { match: "Passwords do not match." };
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            setOpenConfirmDialog(true);
        }
    };


    // Confirm Password Change
    const handleConfirm = () => {
        console.log("Current Password:", currentPassword);
        console.log("New Password:", newPassword);
        console.log("Confirm Password:", confirmPassword);
        setOpenConfirmDialog(false);
        setOpenChangePassModal(false); // Close modal (handled by parent)
    };

    return (
        <>
            <h3 style={{ textAlign: "center", marginBottom: "16px" }}>CHANGE PASSWORD</h3>

            {/* Password Fields */}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        type="password"
                        label="Old Password"
                        fullWidth
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        error={!!errors.currentPassword} // Shows red border if error exists
                        helperText={errors.currentPassword} // Displays error message
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        type="password"
                        label="New Password"
                        fullWidth
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        error={!!Object.keys(errors.newPassword || {}).length}
                        helperText={
                            Object.values(errors.newPassword || {}).map((err, index) => (
                                <Typography key={index} color="error" variant="caption" display="block">
                                    {err}
                                </Typography>
                            ))
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="password"
                        label="Confirm New Password"
                        fullWidth
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={!!errors.confirmPassword?.match}
                        helperText={errors.confirmPassword?.match}
                    />
                </Grid>
                <Grid item xs={12}>
                    <p style={{ fontSize: "14px", color: "#555" }}>
                        Password should be a minimum of 8 characters
                        <br />
                        ✅ At least 1 letter
                        <br />
                        ✅ At least 1 number
                        <br />
                        ✅ At least 1 uppercase and lowercase combination
                        <br />
                        ✅ At least 1 special character
                    </p>
                </Grid>
            </Grid>

            {/* Buttons */}
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        SUBMIT
                    </Button>
                </Grid>
                {/* <Grid item>
                    <Button variant="outlined" color="info" onClick={() => setNewPassword("")}>
                        RESET PASSWORD
                    </Button>
                </Grid> */}
                <Grid item>
                    <Button variant="contained" color="error" onClick={() => setOpenChangePassModal(false)}>
                        CANCEL
                    </Button>
                </Grid>
            </Grid>

            {/* Confirmation Dialog */}
            <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
                <DialogTitle>Are you sure you want to change your password?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenConfirmDialog(false)} color="error">
                        No
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ChangePassword;
