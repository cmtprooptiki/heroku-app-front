// import React from 'react';
// import { MultiSelect } from 'primereact/multiselect';

// const FilterMap = ({ options, data, itemTemplate }) => {
    

//     return (
//         <MultiSelect
//             value={options.value}
//             options={Array.from(new Set(data))} // Ensure all values are shown
//             itemTemplate={itemTemplate}
//             onChange={(e) => options.filterCallback(e.value)}
//             placeholder="Select options"
//             className="p-column-filter"
//             display="chip" // Show selected items as chips
//         />
//     );
// };

// export default FilterMap;

import React from 'react';
import { MultiSelect } from 'primereact/multiselect';
import SwapVertIcon from '@mui/icons-material/SwapVert';

const FilterMap = ({ options, data, itemTemplate }) => {
    return (
        <div className="custom-filter-dropdown">
            <MultiSelect
                value={options.value}
                options={Array.from(new Set(data))} // Ensure all values are shown
                itemTemplate={itemTemplate}
                onChange={(e) => options.filterCallback(e.value)}
                placeholder={
                    <span className="custom-placeholder">
                        <SwapVertIcon className="filter-icon" />
                        Choose HCProvider Unit
                    </span>
                }
                className="p-column-filter custom-multiselect" 
                style={{background:"#F9FBFF",borderRadius:"11px",border:"0px",color:"black"}}

                display="chip"
            />
        </div>
    );
};

export default FilterMap;