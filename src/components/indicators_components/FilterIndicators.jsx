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





// import React, { useEffect } from 'react';
// import { MultiSelect } from 'primereact/multiselect';

// const FilterIndicators = ({ options, data, itemTemplate }) => {
//     const uniqueOptions = Array.from(new Set(data));

//     useEffect(() => {
//         // Wait for DOM update
//         setTimeout(() => {
//             const allPanels = document.querySelectorAll('.p-column-filter-overlay');
//             allPanels.forEach(panel => {
//                 const applyBtn = panel.querySelector('.p-column-filter-buttonbar .p-button:last-child');
//                 if (applyBtn) {
//                     if (options.value && options.value.length > 0) {
//                         applyBtn.classList.add('apply-green');
//                     } else {
//                         applyBtn.classList.remove('apply-green');
//                     }
//                 }
//             });
//         }, 100); // delay to ensure panel is rendered
//     }, [options.value]);

//     return (
//         <MultiSelect
//             value={options.value}
//             options={uniqueOptions}
//             itemTemplate={itemTemplate}
//             onChange={(e) => options.filterCallback(e.value)}
//             placeholder="Any"
//             className="p-column-filter"
//         />
//     );
// };

// export default FilterIndicators;