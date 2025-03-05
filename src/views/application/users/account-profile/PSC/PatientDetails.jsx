import PropTypes from "prop-types";
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import UploadIcon from "@mui/icons-material/Upload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useAuth from "hooks/useAuth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import LinearProgress from "@mui/material/LinearProgress";
import HistoryIcon from "@mui/icons-material/History";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Divider } from "@mui/material";



const PatientDetails = ({ patient }) => {
    const { user } = useAuth();
    // console.log(patient);

    return (
        <Box p={2} sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            {/* Grid Layout */}
            <Grid container spacing={2} mt={2}>
                {/* Left Side */}
                <Grid item xs={6}>
                    {/* userdetails */}
                    <Card sx={{ backgroundColor: "#ffffff", boxShadow: 4, borderRadius: 3, p: 3, minHeight: 280 }}>
                        <CardContent>

                            <Grid container alignItems="center" spacing={3}>

                                <Grid container spacing={2}>

                                    {/* name */}
                                    <Grid item xs={3}>
                                        <Typography variant="body2" fontWeight="bold">Name</Typography>
                                        <Typography variant="body2" color="text.secondary">{patient?.fullName || 'N/A'}</Typography>
                                    </Grid>

                                    {/* Gender */}
                                    <Grid item xs={3}>
                                        <Typography variant="body2" fontWeight="bold">Gender</Typography>
                                        <Typography variant="body2" color="text.secondary">{patient?.gender || 'N/A'}</Typography>
                                    </Grid>

                                    {/* Age */}
                                    <Grid item xs={3}>
                                        <Typography variant="body2" fontWeight="bold">Age</Typography>
                                        <Typography variant="body2" color="text.secondary">{patient?.age ? `${patient.age} years` : 'N/A'}</Typography>
                                    </Grid>

                                    {/* Height */}
                                    <Grid item xs={3}>
                                        <Typography variant="body2" fontWeight="bold">Height</Typography>
                                        <Typography variant="body2" color="text.secondary">{patient?.height || 'N/A'}</Typography>
                                    </Grid>

                                    {/* Weight */}
                                    <Grid item xs={3}>
                                        <Typography variant="body2" fontWeight="bold">Weight</Typography>
                                        <Typography variant="body2" color="text.secondary">{patient?.weight || 'N/A'}</Typography>
                                    </Grid>

                                    {/* Pulse */}
                                    <Grid item xs={3}>
                                        <Typography variant="body2" fontWeight="bold">Pulse</Typography>
                                        <Typography variant="body2" color="text.secondary">{patient?.pulse || 'N/A'}</Typography>
                                    </Grid>

                                    {/* Glucose */}
                                    <Grid item xs={3}>
                                        <Typography variant="body2" fontWeight="bold">Glucose</Typography>
                                        <Typography variant="body2" color="text.secondary">{patient?.glucose || 'N/A'}</Typography>
                                    </Grid>

                                    {/* Temperature */}
                                    <Grid item xs={3}>
                                        <Typography variant="body2" fontWeight="bold">Temperature</Typography>
                                        <Typography variant="body2" color="text.secondary">{patient?.temperature || 'N/A'}</Typography>
                                    </Grid>

                                    {/* SpO2 */}
                                    <Grid item xs={3}>
                                        <Typography variant="body2" fontWeight="bold">SpO2</Typography>
                                        <Typography variant="body2" color="text.secondary">{patient?.spO2 || 'N/A'}</Typography>
                                    </Grid>

                                    {/* Blood Pressure */}
                                    <Grid item xs={3}>
                                        <Typography variant="body2" fontWeight="bold">Blood Pressure</Typography>
                                        <Typography variant="body2" color="text.secondary">{patient?.bp || 'N/A'}</Typography>
                                    </Grid>

                                    {/* HbA1c */}
                                    <Grid item xs={3}>
                                        <Typography variant="body2" fontWeight="bold">HbA1c</Typography>
                                        <Typography variant="body2" color="text.secondary">{patient?.hbA1c || 'N/A'}</Typography>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <Typography variant="body2" fontWeight="bold">Latest Notes</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {patient?.latestNotes ? patient.latestNotes : 'No recent notes available'}
                                        </Typography>
                                    </Grid>


                                </Grid>



                            </Grid>
                        </CardContent>
                    </Card>
                    <br></br>
                    {/* Compliance */}
                    <Card sx={{ backgroundColor: "#ffffff", boxShadow: 4, borderRadius: 3, p: 3, minHeight: 280 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" >Compliance</Typography>
                            <br />
                            <Grid container alignItems="center" spacing={4}>

                                {/* First Circle */}
                                <Grid item sx={{ textAlign: "center", flexDirection: "column", mr: 8 }}>
                                    <Box sx={{ position: "relative", display: "inline-flex" }}>
                                        <CircularProgress variant="determinate" value={100} size={70} sx={{ color: "blue", position: "absolute" }} />
                                        <CircularProgress variant="determinate" value={72} size={70} sx={{ color: "green" }} />
                                        <Box sx={{
                                            position: "absolute", top: "50%", left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: "16px", fontWeight: "bold"
                                        }}>
                                            <Typography variant="body2" color="black">72%</Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="body2" fontWeight="bold" mt={1} color="text.secondary">Medication</Typography>
                                </Grid>

                                {/* Second Circle */}
                                <Grid item sx={{ textAlign: "center", flexDirection: "column", mr: 8 }}>
                                    <Box sx={{ position: "relative", display: "inline-flex" }}>
                                        <CircularProgress variant="determinate" value={100} size={70} sx={{ color: "blue", position: "absolute" }} />
                                        <CircularProgress variant="determinate" value={35} size={70} sx={{ color: "green" }} />
                                        <Box sx={{
                                            position: "absolute", top: "50%", left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: "16px", fontWeight: "bold"
                                        }}>
                                            <Typography variant="body2" color="black">35%</Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="body2" fontWeight="bold" mt={1} color="text.secondary">Vitals</Typography>
                                </Grid>

                                {/* Week, Month, Year Buttons */}
                                <Grid item sx={{ mr: 8 }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                        {["Week", "Month", "Year"].map((label) => (
                                            <Button
                                                key={label}
                                                variant="contained"
                                                size="small"
                                                sx={{
                                                    textTransform: "none",
                                                    fontWeight: "bold",
                                                    backgroundColor: "#f0f0f0",
                                                    color: "black",
                                                    boxShadow: 1,
                                                    "&:hover": { backgroundColor: "#007bff", color: "white" }
                                                }}
                                            >
                                                {label}
                                            </Button>
                                        ))}
                                    </Box>
                                </Grid>

                                {/* Person Icon & KOS Score */}
                                <Grid item sx={{ textAlign: "center" }}>
                                    <PersonIcon sx={{ color: "#4CAF50", fontSize: 50 }} />
                                    <Typography fontWeight="bold" color="text.secondary">KOS Score</Typography>
                                    <Typography variant="h6" fontWeight="bold" color="primary">0 / 100</Typography>
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>


                    {/* Appointments */}
                    <Card sx={{ minHeight: 290, mt: 2, backgroundColor: "#ffffff", boxShadow: 2, borderRadius: 2 }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6">
                                    <i className="fas fa-calendar-alt"></i> Appointments
                                </Typography>
                                <Button variant="outlined" startIcon={<AddIcon />} size="small" sx={{ color: "pink", borderColor: "pink" }}>
                                    Add
                                </Button>
                            </Box>

                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Date</b></TableCell>
                                            <TableCell><b>Time</b></TableCell>
                                            <TableCell><b>Reason</b></TableCell>
                                            <TableCell><b>Provider</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                <Box sx={{ backgroundColor: "#e3f2fd", p: 1, borderRadius: 1 }}>
                                                    No upcoming appointment(s) found!
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>

                    {/* Medications */}
                    <Card sx={{ minHeight: 290, mt: 2, backgroundColor: "#ffffff", boxShadow: 2, borderRadius: 2 }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6">
                                    <i className="fas fa-calendar-alt"></i> Medications
                                </Typography>
                                <Button variant="outlined" startIcon={<AddIcon />} size="small" sx={{ color: "pink", borderColor: "pink" }}>
                                    Add
                                </Button>
                            </Box>

                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Date</b></TableCell>
                                            <TableCell><b>Time</b></TableCell>
                                            <TableCell><b>Reason</b></TableCell>
                                            <TableCell><b>Provider</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                <Box sx={{ backgroundColor: "#e3f2fd", p: 1, borderRadius: 1 }}>
                                                    No upcoming appointment(s) found!
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>










                {/* Right Side */}
                <Grid item xs={6}>
                    {/* Complete History */}

                    <Card sx={{ minHeight: 280, backgroundColor: "#ffffff", boxShadow: 2, borderRadius: 2, p: 2 }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Typography variant="h6">Complete History</Typography>
                            </Box>
                            <Grid container spacing={2}>
                                {/* Left Side */}
                                <Grid item xs={6}>
                                    {/* Emergency (Orange & Gray) */}
                                    <Box mb={2}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={40}
                                            sx={{
                                                height: 10,
                                                borderRadius: 5,
                                                '& .MuiLinearProgress-bar': { backgroundColor: "#ff9800" },
                                                backgroundColor: "#bdbdbd"
                                            }}
                                        />
                                        <Typography variant="body2" align="center" mt={1}>Emergency</Typography>
                                    </Box>

                                    {/* History (Full Green) */}
                                    <Box mb={2}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={100}
                                            sx={{
                                                height: 10,
                                                borderRadius: 5,
                                                backgroundColor: "#bdbdbd",
                                                '& .MuiLinearProgress-bar': { backgroundColor: "#4caf50" }
                                            }}
                                        />
                                        <Typography variant="body2" align="center" mt={1}>History</Typography>
                                    </Box>


                                    {/* KOS (Full Green) */}
                                    <Box mb={2}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={100}
                                            sx={{
                                                height: 10,
                                                borderRadius: 5,
                                                backgroundColor: "#bdbdbd",
                                                '& .MuiLinearProgress-bar': { backgroundColor: "#4caf50" }
                                            }}
                                        />
                                        <Typography variant="body2" align="center" mt={1}>KOS</Typography>
                                    </Box>
                                </Grid>

                                {/* Right Side */}
                                <Grid item xs={6}>
                                    {/* Sensors (Orange & Gray) */}
                                    <Box mb={2}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={40}
                                            sx={{
                                                height: 10,
                                                borderRadius: 5,
                                                '& .MuiLinearProgress-bar': { backgroundColor: "#ff9800" },
                                                backgroundColor: "#bdbdbd"
                                            }}
                                        />
                                        <Typography variant="body2" align="center" mt={1}>Sensors</Typography>
                                    </Box>

                                    {/* Doctor (Full Green) */}
                                    <Box mb={2}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={100}
                                            sx={{
                                                height: 10,
                                                borderRadius: 5,
                                                backgroundColor: "#bdbdbd",
                                                '& .MuiLinearProgress-bar': { backgroundColor: "#4caf50" }
                                            }}
                                        />
                                        <Typography variant="body2" align="center" mt={1}>Doctor</Typography>
                                    </Box>

                                    {/* Insurance (Orange & Gray) */}
                                    <Box mb={2}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={40}
                                            sx={{
                                                height: 10,
                                                borderRadius: 5,
                                                '& .MuiLinearProgress-bar': { backgroundColor: "#ff9800" },
                                                backgroundColor: "#bdbdbd"
                                            }}
                                        />
                                        <Typography variant="body2" align="center" mt={1}>Insurance</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>



                    {/* Reports/Documents */}
                    <Card sx={{ minHeight: 280, mt: 2, backgroundColor: "#ffffff", boxShadow: 2, borderRadius: 2, p: 2 }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box display="flex" alignItems="center">
                                    <i className="fas fa-file-alt"></i>
                                    <Typography variant="h6" sx={{ ml: 1 }}>Reports/Documents</Typography>
                                </Box>
                                <Button variant="outlined" startIcon={<UploadIcon />} size="small" sx={{ color: "green", borderColor: "green" }}>
                                    Upload
                                </Button>
                            </Box>
                            <Grid container spacing={2} mt={2}>
                                {["Lab", "Radiology", "Cardiac", "Lungs", "Women", "GI", "Care Plan", "Miscellaneous", "Legal"].map((item) => (
                                    <Grid item xs={4} key={item}>
                                        <Button variant="outlined" sx={{ width: "100%", justifyContent: "space-between", pr: 1 }}>
                                            {item} <i className="fas fa-plus-circle" style={{ color: "blue" }}></i>
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* Sensors Graph */}

                    <Card sx={{ minHeight: 280, mt: 2, backgroundColor: "#ffffff", boxShadow: 2, borderRadius: 2 }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography variant="h6">Sensors</Typography>
                                <IconButton>
                                    <VisibilityIcon />
                                </IconButton>
                            </Box>

                            {/* Chart Section */}
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={[
                                    { name: '1', value: 0 },
                                    { name: '2', value: 10 },
                                    { name: '3', value: 20 },
                                    { name: '4', value: 15 },
                                    { name: '5', value: 30 }
                                ]}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>

                            {/* No Events Message */}
                            <Typography align="center" mt={2} sx={{ color: "gray" }}>
                                No events created for this time period
                            </Typography>
                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
        </Box>
    );
};

export default PatientDetails;
