import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,Cell } from "recharts";
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

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const department = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded shadow">
          <Typography variant="h6" style={{ fontFamily: "Poppins", fontWeight: "600" }}>
            {department.department}
          </Typography>
          <Typography variant="body1" style={{ fontFamily: "Poppins", fontWeight: "600" }}>
            Total Beds: {department.beds}
          </Typography>
          {department.units.length > 0 && (
            <div>
              <Typography variant="body2" style={{ fontWeight: "600" }}>Units:</Typography>
              <ul>
                {department.units.map((unit, index) => (
                  <li key={index}>
                    {unit.unit}: {unit.beds} beds
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6">
    <div className="p-6">
      <FormControl className="w-64 mb-4" variant="outlined" size="small">
        <label>Select Sector</label>
        <Select value={selectedSector} onChange={handleSectorChange} sx={{ width: '100%', minWidth: 200, maxWidth: 300 }}>
          {sectors.map((sector, index) => (
            <MenuItem key={index} value={sector}>{sector}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <h4 className="section-title mt-6">Beds per Department</h4>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={filteredData} onClick={(e) => setSelectedDepartment(e.activeLabel)}>
          <XAxis dataKey="department" tick={{ fontSize: 12 }} angle={-90} textAnchor="end" interval={0} height={80} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="beds">
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.units.length > 0 ? "#FF5733" : "#0F00AB"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
      {/* <FormControl className="w-64 mb-4">
        <InputLabel>Select a Sector</InputLabel>
        <Select value={selectedSector} onChange={handleSectorChange}>
          {sectors.map((sector, index) => (
            <MenuItem key={index} value={sector}>{sector}</MenuItem>
          ))}
        </Select>
      </FormControl> */}

      {/* <FormControl className="w-64 mb-4" variant="outlined" size="small">
      <label>Select Sector</label>
      <InputLabel id="sector-label"></InputLabel>
  <Select
    labelId="sector-label"
    value={selectedSector}
    onChange={handleSectorChange}
    // label="Select a Sector"
    sx={{
      width: '100%',   // Ensures it fits within the container
      minWidth: 200,   // Prevents it from being too small
      maxWidth: 300,   // Avoids excessive stretching
    }}
  >
    {sectors.map((sector, index) => (
      <MenuItem key={index} value={sector}>
        {sector}
      </MenuItem>
    ))}
  </Select>
</FormControl>

<h4 className="section-title mt-6">Beds per Department</h4>


      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={filteredData} onClick={(e) => setSelectedDepartment(e.activeLabel)}>
          <XAxis dataKey="department"
           tick={{ fontSize: 12 }} 
           angle={-90} 
      textAnchor="end" 
      interval={0} 
      height={80} 
       />
          <YAxis />
          <Tooltip />
          <Bar dataKey="beds" fill="rgb(15, 0, 171)" />
        </BarChart>
      </ResponsiveContainer> */}

      {selectedDepartment && (
        <Card className="mt-4 p-4">
          <Typography variant="h6" className="font-semibold">Department:<span style={{color:"rgb(15, 0, 171)",fontFamily:"Poppins"}}> {selectedDepartment}</span></Typography>
          <Typography variant="h6" className="font-semibold" style={{color:"black",fontFamily:"Poppins"}}>
            Sector:<span style={{color:"rgb(15, 0, 171)",fontFamily:"Poppins"}}> {filteredData.find(d => d.department === selectedDepartment)?.sector}</span>
          </Typography>
          {filteredData.find(d => d.department === selectedDepartment)?.units.length ? (
            <div>
              <Typography variant="h6" className="font-semibold">Units:</Typography>
              <ul className="mt-2">
                {filteredData.find(d => d.department === selectedDepartment).units.map((unit, index) => (
                  <li key={index} className="border-b py-2 flex justify-between">
                    <Typography variant="body1" style={{color:"black",fontFamily:"Poppins"}}>{unit.unit}</Typography>
                    <Typography variant="body1" className="ml-3" style={{fontFamily:"Poppins",fontWeight:"600"}}>Beds: {unit.beds}</Typography>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Typography variant="body1" className="ml-3" style={{fontFamily:"Poppins",fontWeight:"600"}}>Beds: {filteredData.find(d => d.department === selectedDepartment).beds}
            </Typography>
          )}
          <Button style={{
                    display: "flex",
                    justifyContent: "center",
                        color: "white",
                        fontFamily: 'Poppins',
                        fontSize: "13px",
                        paddingLeft: "23px",
                        paddingRight: "23px",
                        lineHeight: "2rem",
                        background: "#0F00AB",
                        border: "1px solid #ffffff",
                        borderRadius: "6px",
                }} onClick={() => setSelectedDepartment(null)}>
            Close
          </Button>
        </Card>
      )}
    </div>
  );
}
