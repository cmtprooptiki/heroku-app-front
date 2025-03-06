import React,{useState,useEffect, useRef} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import apiBaseUrl from '../../apiConfig'
import { useSelector } from 'react-redux'
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import { PrimeIcons } from 'primereact/api';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
import { Toast } from 'primereact/toast';

const UserList = () => {
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const [users,setUsers]=useState([]);
    const {user} =useSelector((state)=>state.auth)

    const [roles,setRoles]=useState([])


    useEffect(()=>{
        getUsers();
        setLoading(false);
        initFilters();
    },[]);

    const getUsers = async() =>{
        const response = await axios.get(`${apiBaseUrl}/users`, {timeout: 5000});
        const userData=response.data;
        setUsers(response.data);
        const uniqueRole=[...new Set(userData.map(item=>item.role))];
        setRoles(uniqueRole);
        console.log("roles",uniqueRole)
    }
    const deleteUser = async(userId)=>{
        await axios.delete(`${apiBaseUrl}/users/${userId}`);
        getUsers();
    }


    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e) => {
        
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const toast = useRef(null)

    const accept = (id) => {
        try {
            deleteUser(id);
            toast.current.show({ severity: 'success', summary: 'Deleted Successfully', detail: `Item ${id} has been deleted.` });
        } catch (error) {
            console.error('Failed to delete:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete the item. Please try again.',
                life: 3000,
            });
        } 
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        getUsers()
    }

    const confirm = (id) => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: () => accept(id),
            reject: () => reject() // Optional
        });
    };


    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: { value: null, matchMode: FilterMatchMode.IN },
            email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            role: {  value: null, matchMode: FilterMatchMode.IN  },

            
        });
        setGlobalFilterValue('');
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`${apiBaseUrl}/${rowData.profileImage}`} alt={rowData.profileImage} className="w-6rem shadow-2 border-round" />;
    };


    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button style = {{fontSize: "18px"}} type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </IconField>
            </div>
        );
    };
    const header = renderHeader();

    const actionsBodyTemplate=(rowData)=>{
        const id=rowData.uuid
        return(
            <div className=" flex flex-wrap justify-content-center gap-3">
               
            {user && user.role!=="admin" &&(
                <div>
                </div>
            )}
            {user && user.role ==="admin" && (
            <span className='flex gap-1'>
               
                <Link to={`/users/edit/${id}`}><Button className='action-button'  icon="pi pi-pen-to-square" severity="info" aria-label="Εdit" /></Link>
                <Button className='action-button'  icon="pi pi-trash" severity="danger" aria-label="delete" onClick={()=>confirm(id)} />
                {/* <Button label="Διαγραφή" severity="danger" onClick={()=>deleteParadotea(id)} text raised /> */}
            </span>
           
            )}
            </div>
 
        );
    }

    const rolesBodyTemplate = (rowData) => {
        const role = rowData.role;
        console.log("rep body template: ",role)
        return (
            <div className="flex align-items-center gap-2">
                <span>{role}</span>
            </div>
        );
    };

  

    const rolesFilterTemplate = (options) => {
        console.log('Current projectmanager filter value:', options);
        console.log("roles filter",roles)
        return (<MultiSelect value={options.value} options={roles} itemTemplate={rolesItemTemplate} onChange={(e) => options.filterCallback(e.value)} placeholder="Any" className="p-column-filter" />);

    };

    const rolesItemTemplate = (option) => {
        console.log("rep Item template: ",option)

        return (
            <div className="flex align-items-center gap-2">
                <span>{option}</span>
            </div>
        );
    };
    

  return (


    <div className="card" >
     <h1 className='title'>Users Settings</h1>
    {user && user.role ==="admin" && (
    <Link to={"/users/add"} className='button is-primary mb-2'><Button label="Add New User" icon="pi pi-plus-circle"/></Link>
    )}
     <Toast ref={toast} />
     <ConfirmDialog />
<DataTable value={users} paginator stripedRows
 rows={20} scrollable scrollHeight="600px" loading={loading} dataKey="id" 
        filters={filters} 
        globalFilterFields={[ 'name', 
            'profileImage', 'email',
            'role',
            ]} 
        header={header} 
        emptyMessage="No user found.">
            <Column field="name" header="Name"  filter filterPlaceholder="Search by name"  style={{ minWidth: '12rem' }}></Column>
            <Column field="profileImage" header="Profile Image"  body={imageBodyTemplate}></Column>
            <Column field="email" header="Email"  filter filterPlaceholder="Search by email"  style={{ minWidth: '12rem' }}></Column>
            <Column header="Role" filterField="role" showFilterMatchModes={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }}
                    body={rolesBodyTemplate} filter filterElement={rolesFilterTemplate} />
           
            <Column header="Actions" field="id" body={actionsBodyTemplate} alignFrozen="right" frozen/>

</DataTable>


</div>
  
  )
}

export default UserList