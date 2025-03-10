import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

// project imports
import Profile from './Profile';
import PersonalAccount from './PersonalAccount';
import PatientCard from './PatientCard';
import PatientList from './PatientList';
import MyAccount from './MyAccount';
import ChangePassword from './ChangePassword';
import Settings from './Settings';
import MainCard from 'ui-component/cards/MainCard';
import { ThemeMode } from 'config';

import { gridSpacing } from 'store/constant';

// assets
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import OnDeviceTrainingTwoToneIcon from '@mui/icons-material/OnDeviceTrainingTwoTone';
// tabs panel
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// tabs option
const tabsOption = [
    {
        label: 'Dashboard',
        icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'ALL',
        icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'RPM',
        icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'CCM',
        icon: <LibraryBooksTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Telehealth',
        icon: <OnDeviceTrainingTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Global Settings',
        icon: <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    }
];

// ==============================|| PROFILE 1 ||============================== //

const Home = () => {
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [patientCounts, setPatientCounts] = useState({
        ALL: 0,
        RPM: 0,
        CCM: 0,
        Telehealth: 0
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                // debugger;
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
                    // calculateCounts(data.data);
                }
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        };
        fetchPatients();
    }, []);

    useEffect(() => {
        const all = patients.length;
        const rpm = patients.filter((patient) => patient.isRPM).length;
        const ccm = patients.filter((patient) => patient.isCCM).length;
        const telehealth = patients.filter((patient) => patient.isTelehealth).length;

        setPatientCounts({
            ALL: all,
            RPM: rpm,
            CCM: ccm,
            Telehealth: telehealth || 0
        });
    }, [patients]);



    return (
        <MainCard sx={{ overflow: 'hidden', height: '100vh' }}>

            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    {/* Sticky Tabs */}
                    <Box
                        sx={{
                            position: 'sticky',
                            top: 0,
                            backgroundColor: theme.palette.background.paper,
                            zIndex: 1000
                        }}
                    >
                        <Tabs
                            value={value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChange}
                            aria-label="simple tabs example"
                            variant="scrollable"
                            sx={{
                                mb: 0, // Remove bottom margin for proper alignment
                                '& a': {
                                    minHeight: 'auto',
                                    minWidth: 10,
                                    py: 1.5,
                                    px: 1,
                                    mr: 2.25,
                                    color: theme.palette.mode === ThemeMode.DARK ? 'grey.600' : 'grey.900',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                },
                                '& a.Mui-selected': {
                                    color: 'primary.main'
                                },
                                '& .MuiTabs-indicator': {
                                    bottom: 2
                                },
                                '& a > svg': {
                                    marginBottom: '0px !important',
                                    mr: 1.25
                                }
                            }}
                        >
                            {tabsOption.map((tab, index) => {
                                let label = tab.label;
                                if (tab.label !== 'Dashboard' && tab.label !== 'Global Settings') {
                                    label = `${tab.label} (${patientCounts[tab.label] || 0})`;
                                }
                                return <Tab key={index} component={Link} to="#" icon={tab.icon} label={label} {...a11yProps(index)} />;
                            })}
                        </Tabs>
                    </Box>

                    {/* Scrollable Content */}
                    <Box
                        sx={{
                            height: 'calc(100vh - 150px)', // Adjust height dynamically
                            overflowY: 'hidden',
                            padding: 2
                        }}
                    >
                        <TabPanel value={value} index={0}>
                            <Profile />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <PatientList filter="ALL" />
                        </TabPanel>
                        {/* <TabPanel value={value} index={2}>
                            <PatientList filter="RPM" />
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <PatientList filter="CCM" />
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            <PatientList filter="Telehealth" />
                        </TabPanel>
                        <TabPanel value={value} index={5}>
                            <Settings />
                        </TabPanel> */}
                    </Box>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Home;
