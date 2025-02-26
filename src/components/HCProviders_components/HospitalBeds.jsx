import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";
import { Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const data = [
  { department: "Paediatrics", sector: "Medical", beds: 181, units: [] },
  { department: "Neonatal Intensive Care Unit (NICU)", sector: "Medical", beds: 60, units: [
    { unit: "High-Dependency Unit (HDU)", beds: 20 },
    { unit: "Intensive Care Unit (ICU)", beds: 40 },
  ]},
  { department: "Pediatric Intensive Care Unit (PICU)", sector: "Surgical", beds: 10, units: [
    { unit: "Pediatric Intensive Care Unit (PICU)", beds: 10 }
  ]},
  { department: "Paediatric Hematology and Oncology", sector: "Medical", beds: 72, units: [
    { unit: "Day- care", beds: 16 },
    { unit: "Hematopoietic Stem Cell Transplantation", beds: 4 }
  ]},
];

const sectors = [...new Set(data.map(d => d.sector))];

export default function HospitalBedsChart() {
  const [selectedSector, setSelectedSector] = useState(sectors[0]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const filteredData = data.filter(d => d.sector === selectedSector);

  return (
    <div className="p-6">
      <Typography variant="h5" className="mb-4">Hospital Beds per Department</Typography>
      
      <FormControl className="w-64 mb-4">
        <InputLabel>Select a Sector</InputLabel>
        <Select value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)}>
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
          <Typography variant="body1" className="text-gray-600">Sector: {filteredData.find(d => d.department === selectedDepartment)?.sector}</Typography>
          {filteredData.find(d => d.department === selectedDepartment)?.units.length ? (
            <ul className="mt-2">
              {filteredData.find(d => d.department === selectedDepartment).units.map((unit, index) => (
                <li key={index} className="border-b py-2 flex justify-between">
                  <Typography variant="body2">Unit: {unit.unit}</Typography>
                  <Typography variant="body2" className="font-bold">Beds: {unit.beds}</Typography>
                </li>
              ))}
            </ul>
          ) : (
            <Typography variant="body2" className="text-gray-500">No specific units, total beds: {filteredData.find(d => d.department === selectedDepartment).beds}</Typography>
          )}
          <Button className="mt-2" variant="contained" color="primary" onClick={() => setSelectedDepartment(null)}>Close</Button>
        </Card>
      )}
    </div>
  );
}
