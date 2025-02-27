import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, Typography, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import apiBaseUrl from '../../apiConfig';
import axios from 'axios';

export default function HospitalBedsChart({ id }) {
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [hospitalData, setHospitalData] = useState([]);
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    getHcpInfo();
  }, []);

  const getHcpInfo = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/hcpInfoSpec/${id}`, { timeout: 5000 });
      const transformedData = transformData(response.data);
      setHospitalData(transformedData);

      // Extract unique sectors from the transformed data
      const uniqueSectors = [...new Set(transformedData.map(d => d.sector))];
      setSectors(uniqueSectors);

      // Set initial selected sector
      if (uniqueSectors.length > 0) setSelectedSector(uniqueSectors[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const transformData = (hcpInfo) => {
    const departmentMap = new Map();

    hcpInfo.forEach(item => {
      const departmentName = item.Department.trim();
      const unitName = item.Unit ? item.Unit.trim() : null;
      const sector = item.Sector.trim();
      const beds = item.Number_Of_Beds || 0;

      if (!departmentMap.has(departmentName)) {
        departmentMap.set(departmentName, {
          department: departmentName,
          sector,
          beds: 0,
          units: []
        });
      }

      const departmentEntry = departmentMap.get(departmentName);
      departmentEntry.beds += beds;

      if (unitName) {
        departmentEntry.units.push({ unit: unitName, beds });
      }
    });

    return Array.from(departmentMap.values());
  };

  const handleSectorChange = (e) => {
    const newSector = e.target.value;
    if (selectedDepartment) {
      setSelectedDepartment(null);
    }
    setSelectedSector(newSector);
  };

  const filteredData = hospitalData.filter(d => d.sector === selectedSector);

  return (
    <div className="p-6">
      <Typography variant="h5" className="mb-4">Hospital Beds per Department</Typography>

      <FormControl className="w-64 mb-4">
        <InputLabel>Select a Sector</InputLabel>
        <Select value={selectedSector} onChange={handleSectorChange}>
          {sectors.map((sector, index) => (
            <MenuItem key={index} value={sector}>{sector}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={filteredData} onClick={(e) => setSelectedDepartment(e.activeLabel)}>
          <XAxis dataKey="department" tick={{ fontSize: 12 }} angle={-15} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="beds" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>

      {selectedDepartment && (
        <Card className="mt-4 p-4">
          <Typography variant="h6" className="font-semibold">Department: {selectedDepartment}</Typography>
          <Typography variant="body1" className="text-gray-600">
            Sector: {filteredData.find(d => d.department === selectedDepartment)?.sector}
          </Typography>
          {filteredData.find(d => d.department === selectedDepartment)?.units.length ? (
            <div>
              <Typography variant="body1">Units:</Typography>
              <ul className="mt-2">
                {filteredData.find(d => d.department === selectedDepartment).units.map((unit, index) => (
                  <li key={index} className="border-b py-2 flex justify-between">
                    <Typography variant="body2">{unit.unit}</Typography>
                    <Typography variant="body2" className="ml-3">Beds: {unit.beds}</Typography>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Typography variant="body2" className="text-gray-500">
              Beds: {filteredData.find(d => d.department === selectedDepartment).beds}
            </Typography>
          )}
          <Button className="mt-2" variant="contained" color="primary" onClick={() => setSelectedDepartment(null)}>
            Close
          </Button>
        </Card>
      )}
    </div>
  );
}
