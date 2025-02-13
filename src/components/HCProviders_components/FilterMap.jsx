import React from 'react';
import { MultiSelect } from 'primereact/multiselect';

const FilterMap = ({ options, data, itemTemplate }) => {
    // Ensure selected values always appear first
    const sortedOptions = [...new Set(data)].sort((a, b) => {
        if (options.value.includes(a) && !options.value.includes(b)) return -1;
        if (!options.value.includes(a) && options.value.includes(b)) return 1;
        return 0;
    });

    return (
        <MultiSelect
            value={options.value}
            options={sortedOptions} // Ensure all values are shown
            itemTemplate={itemTemplate}
            onChange={(e) => options.filterCallback(e.value)}
            placeholder="Select options"
            className="p-column-filter"
            display="chip" // Show selected items as chips
        />
    );
};

export default FilterMap;