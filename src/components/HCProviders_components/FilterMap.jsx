import React from 'react';
import { MultiSelect } from 'primereact/multiselect';

const FilterMap = ({ options, data, itemTemplate }) => {
    

    return (
        <MultiSelect
            value={options.value}
            options={Array.from(new Set(data))} // Ensure all values are shown
            itemTemplate={itemTemplate}
            onChange={(e) => options.filterCallback(e.value)}
            placeholder="Select options"
            className="p-column-filter"
            display="chip" // Show selected items as chips
        />
    );
};

export default FilterMap;