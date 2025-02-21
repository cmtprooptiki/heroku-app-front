import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Slider } from "primereact/slider";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";

const HospitalTable = ({ hospitals }) => {
    const [globalFilter, setGlobalFilter] = useState("");
    const [filteredHospitals, setFilteredHospitals] = useState([]);
    const [distance, setDistance] = useState(5); // Default distance 5km
    const [selectedHospital, setSelectedHospital] = useState(null); // Selected hospital as starting point

    // Function to Calculate Distance Using Haversine Formula
    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of Earth in KM
        const toRad = (deg) => (deg * Math.PI) / 180;

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in KM
    };

    // 🔥 Automatically filter hospitals when user selects a reference hospital or changes distance
    useEffect(() => {
        if (!selectedHospital) {
            setFilteredHospitals([]);
            return;
        }

        const referenceHospital = hospitals.find(h => h.Name_GR === selectedHospital);
        if (!referenceHospital) return;

        const filtered = hospitals
            .filter(hospital => hospital.Name_GR !== selectedHospital) // Exclude selected hospital
            .filter(hospital => {
                const distanceKm = getDistance(
                    referenceHospital.lat,
                    referenceHospital.lon,
                    hospital.lat,
                    hospital.lon
                );
                return distanceKm <= distance; // Only include hospitals within selected distance
            });

        setFilteredHospitals(filtered);
    }, [selectedHospital, distance, hospitals]);

    return (
        <div>
            {/* Selection Controls */}
            <Card className="p-mb-3">
                <h3>Select a Reference Hospital:</h3>
                <Dropdown
                    value={selectedHospital}
                    options={hospitals.map(h => h.Name_GR)}
                    onChange={(e) => setSelectedHospital(e.value)}
                    placeholder="Choose a hospital..."
                    className="p-mb-3"
                />

                <h3>Define Distance (km): {distance} km</h3>
                <Slider
                    value={distance}
                    onChange={(e) => setDistance(e.value)}
                    min={1}
                    max={50}
                    step={1}
                    style={{ width: "80%" }}
                />
            </Card>

            {/* Search Input */}
            <div className="p-inputgroup p-mb-3">
                <InputText
                    placeholder="Search hospitals..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                />
            </div>

            {/* Data Table */}
            <DataTable 
                value={filteredHospitals} 
                paginator rows={10} 
                globalFilter={globalFilter}
                emptyMessage="No hospitals found within the selected distance."
            >
                <Column field="Name_GR" header="Hospital Name" sortable />
                <Column field="lat" header="Latitude" sortable />
                <Column field="lon" header="Longitude" sortable />
            </DataTable>
        </div>
    );
};

export default HospitalTable;
