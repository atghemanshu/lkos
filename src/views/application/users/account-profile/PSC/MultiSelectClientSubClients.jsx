import React, { useState, useEffect } from 'react';
import axios from 'utils/axios';
import { MenuItem, Select, Checkbox, ListItemText, OutlinedInput, InputLabel, FormControl, ListSubheader } from '@mui/material';

const MultiSelectDropdown = () => {
    const [clients, setClients] = useState([]);
    const [subClients, setSubClients] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const serviceToken = window.localStorage.getItem('serviceToken');
                const response = await axios.get('https://myavawebapi.azurewebsites.net/api/OptionSet/PatientProfileOptions', {
                    headers: {
                        accept: '*/*',
                        Authorization: `Bearer ${serviceToken}`
                    }
                });

                const clientData = response.data.clients;
                const subClientData = response.data.subClients;
                setClients(clientData);
                setSubClients(subClientData);
                setSelectedValues([...clientData, ...subClientData]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleClientChange = (client) => {
        const isSelected = selectedValues.some((val) => val.id === client.id);
        if (isSelected) {
            setSelectedValues(selectedValues.filter((val) => val.id !== client.id && val.parent?.id !== client.id));
        } else {
            setSelectedValues([...selectedValues, client, ...subClients.filter((sc) => sc.parent.id === client.id)]);
        }
    };

    const handleSubClientChange = (subClient) => {
        const isSelected = selectedValues.some((val) => val.id === subClient.id);
        let newSelectedValues = isSelected ? selectedValues.filter((val) => val.id !== subClient.id) : [...selectedValues, subClient];

        const parentClient = clients.find((client) => client.id === subClient.parent.id);
        const siblingSubClients = subClients.filter((sc) => sc.parent.id === subClient.parent.id);
        const areAllSubClientsUnchecked = siblingSubClients.every((sc) => !newSelectedValues.some((val) => val.id === sc.id));

        if (areAllSubClientsUnchecked) {
            newSelectedValues = newSelectedValues.filter((val) => val.id !== parentClient?.id);
        } else if (!isSelected && parentClient && !newSelectedValues.some((val) => val.id === parentClient.id)) {
            newSelectedValues.push(parentClient);
        }

        setSelectedValues(newSelectedValues);
    };

    const getLabel = () => {
        return selectedValues.length === 0 ? '--Select--' : selectedValues.map((x) => x.displayValue).join(', ');
    };

    return (
        <div>
            <FormControl sx={{ width: 220 }}>
                <InputLabel id="multi-select-label">Clients & Subclients</InputLabel>
                <Select
                    labelId="multi-select-label"
                    id="multi-select"
                    multiple
                    value={selectedValues}
                    onChange={() => {}}
                    input={<OutlinedInput label="Clients & Subclients" />}
                    renderValue={() => getLabel()}
                >
                    {clients.map((client) => (
                        <div key={client.id}>
                            <ListSubheader>
                                <Checkbox
                                    checked={selectedValues.some((val) => val.id === client.id)}
                                    onChange={() => handleClientChange(client)}
                                />
                                {client.displayValue}
                            </ListSubheader>
                            {subClients
                                .filter((subClient) => subClient.parent.id === client.id)
                                .map((subClient) => (
                                    <MenuItem key={subClient.id} value={subClient.id} sx={{ pl: 4 }}>
                                        <Checkbox
                                            checked={selectedValues.some((val) => val.id === subClient.id)}
                                            onChange={() => handleSubClientChange(subClient)}
                                        />
                                        <ListItemText primary={subClient.displayValue} />
                                    </MenuItem>
                                ))}
                        </div>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default MultiSelectDropdown;
