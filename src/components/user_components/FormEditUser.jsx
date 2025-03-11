import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import apiBaseUrl from '../../apiConfig'
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
const FormEditUser = () => {
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[confPassword,setConfPassword]=useState("");
    // const[role,setRole]=useState("");
    const [profileImage, setProfileImage] = useState(""); // New state for profile image
    const [previewImage, setPreviewImage] = useState(''); // State for previewing selected image

    const[msg,setMsg]=useState("");
    const navigate = useNavigate();
    const{id} = useParams();

    const [role, setRole] = useState(null);

    const roles = [
        { label: 'Administrator', value: 'admin' },
        { label: 'User', value: 'user' },
        { label: 'Hcp', value: 'hcp' },
        { label: 'Indicator', value: 'indicator' }
    ];

    useEffect(()=>{
        const getUserById = async()=>{
            try {
                const response=await axios.get(`${apiBaseUrl}/users/${id}`, {timeout: 5000});
                setName(response.data.name);
                setEmail(response.data.email);
                setRole(response.data.role);
                setProfileImage(response.data.profileImage);
                // If profileImage URL is available, set previewImage for immediate display
        if (response.data.profileImage) {
            setPreviewImage(`${apiBaseUrl}/${response.data.profileImage}`); // Construct full image URL
          }
            } catch (error) {
                if(error.response){
                    setMsg(error.response.data.msg);
                }
            }
        }
        getUserById();
    },[id]);

    const updateUser = async (e) =>{
        e.preventDefault();
        try{
            await axios.patch(`${apiBaseUrl}/users/${id}`, {
                name:name,
                email:email,
                password:password,
                confPassword:confPassword,
                role:role,
                profileImage:profileImage,
            },  
             {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            
        );
            navigate("/users");
        }catch(error){
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    }


    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        setProfileImage(selectedFile); // Update state for server-side update
    
        // Preview the selected image immediately
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      };
      
      return (
    <div>
        <h1 className='title'>Users Settings</h1>
        <h2 className='subtitle'>Update User</h2>
        <div className="card p-fluid">
            <div className="card-content">
                <div className="content">
                <form onSubmit={updateUser}>
                <p className='has-text-centered'>{msg}</p>

                <div className="field">
                 
                    <div className='mt-auto'>
                    {previewImage ? ( // Conditionally render preview image if available
                        <Avatar image={previewImage} shape="circle" size="xlarge" />
                    ) : (
                        profileImage ? ( // Otherwise, if profileImage URL exists, render it directly
                        <Avatar
                            image={`${apiBaseUrl}/${profileImage}`}
                            shape="circle"
                            size="xlarge"
                        />
                        ) : ( // Default placeholder if no image is available
                        <Avatar shape="circle" size="xlarge" icon="pi pi-user" />
                        )
                    )}
                    </div>
                    <label className="label">Profile Image</label> {/* New field for profile image */}

                    <div className="control">
                        <input type="file" className="input"  onChange={handleImageChange} accept="image/*" />
                        
                    {/* {console.log(profileImage.name)} */}
                    </div>
                </div>


                <div className="field">
                        <label  className="label">Name</label>
                        <div className="control">
                            {/* <input type="text" className="input" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name'/> */}
                            <InputText id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name'/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label">Email</label>
                        <div className="control">
                            {/* <input type="text" className="input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/> */}
                            <InputText id="email" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>

                        </div>
                    </div>
                    <div className="field">
                        <label  className="label">Password</label>
                        <div className="control">
                            {/* <input type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='*********'/> */}
                            <InputText id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='*********'/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label">Confirm Password</label>
                        <div className="control">
                            {/* <input type="password" className="input" value={confPassword} onChange={(e)=>setConfPassword(e.target.value)} placeholder='*********'/> */}
                            <InputText id="Confpassword" type="password" value={confPassword} onChange={(e)=>setConfPassword(e.target.value)} placeholder='*********'/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        {/* <select className="form-select w-100" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="admin">Administrator</option>
                            <option value="user">User</option>
                            <option value="hcp">Hcp</option>
                            <option value="indicator">Indicator</option>
                        </select> */}
                        <Dropdown 
                        value={role} 
                        onChange={(e) => setRole(e.value)} 
                        options={roles} 
                        placeholder="Select Role"
                        className="w-100"
                        />
                    </div>
                 
                    <div className="field">
                        <div className="control">
                            <Button type="submit" label="Update" className="p-button-success is-fullwidth" />
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormEditUser