import React from 'react';
import { MultiSelect } from 'primereact/multiselect';
import SwapVertIcon from '@mui/icons-material/SwapVert';

const FilterName = ({ options, data, itemTemplate }) => {
    const handleChange = (e) => {
        const newValue = e.value;
        // Only keep the last selected item if multiple are chosen
        const selectedValue = newValue.length > 0 ? [newValue[newValue.length - 1]] : [];
        options.filterCallback(selectedValue);
    };

    return (
        <div className="custom-filter-dropdown">
            <MultiSelect
                value={Array.isArray(options.value) ? options.value : []}
                options={Array.from(new Set(data))}
                itemTemplate={itemTemplate}
                onChange={handleChange}
                placeholder={
                    <span className="custom-placeholder">
                        <SwapVertIcon className="filter-icon" />
                        Choose Health Name
                    </span>
                }
                className="p-column-filter custom-multiselect"
                style={{ background: "#F9FBFF", borderRadius: "11px", border: "0px", color: "black" }}
                display="chip"
            />
        </div>
    );
};

export default FilterName;