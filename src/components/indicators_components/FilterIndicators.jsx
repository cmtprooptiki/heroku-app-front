import React from 'react';
import { MultiSelect } from 'primereact/multiselect'; // Import the MultiSelect component from PrimeReact

const FilterIndicators = ({ options, data, itemTemplate }) => {
    console.log("hee: ", options.value)
    console.log("mmm: ", data)
    return (
        <MultiSelect
            value={options.value}
            options={Array.from(new Set(data))} // arry for unique , data otherwise
            itemTemplate={itemTemplate}
            onChange={(e) => options.filterCallback(e.value)}
            placeholder="Any"
            className="p-column-filter"
        />
    );
};

//filterElement={(option) => (<FilterIndicators options={option} data={q4all_Ind_number} itemTemplate={q4all_Ind_numberItemTemplate}/>)}

export default FilterIndicators;