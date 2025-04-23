import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import apiBaseUrl from '../../apiConfig'
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const FormEditSimpleUser = () => {
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[confPassword,setConfPassword]=useState("");
    const[role,setRole]=useState("");
    const [profileImage, setProfileImage] = useState(""); // New state for profile image
    const [previewImage, setPreviewImage] = useState(''); // State for previewing selected image

    const[msg,setMsg]=useState("");
    const navigate = useNavigate();
    const{id} = useParams();

    useEffect(()=>{
        const getUserById = async()=>{
            try {
                const response=await axios.get(`${apiBaseUrl}/SimpleUser/${id}`, {timeout: 5000});
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
            await axios.patch(`${apiBaseUrl}/SimpleUser/${id}`, {
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
            navigate("/home");
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

      console.log("ID", id)
      
      return (
    <div>
        
        <h1 className='title'>Edit Profile</h1>
        {/* <h2 className='subtitle'></h2> */}
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
                            <InputText id="Confpassword" type="password" value={confPassword} onChange={(e)=>setConfPassword(e.target.value)} placeholder='*********'/>
                            {/* <input type="password" className="input" value={confPassword} onChange={(e)=>setConfPassword(e.target.value)} placeholder='*********'/> */}
                        </div>
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

export default FormEditSimpleUser