import React,{useEffect} from 'react'
import Layout from './Layout'

// import HCProvidersList from '../../components/HCProviders_components/HCProvidersList'
// import HCPUsers from '../../components/HCProviders_components/HCPUsers'

import HCPUsers from '../components/HCProviders_components/HCPUsers'

import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'

const HcpUser = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError,user} = useSelector((state=>state.auth));

  useEffect(()=>{
      dispatch(getMe());
  },[dispatch]);

//   useEffect(()=>{
//       if(isError){
//           navigate("/");
//       }
//   },[isError,navigate]);

// useEffect(()=>{
//       if(isError){
//           navigate("/");
//       }
//       if(user && user.role !=="admin"){
//         navigate("/dashboard");
//       }
//   },[isError,user,navigate]);

if(user && (user.role ==="admin" || user.role === "hcp")){
    return (
      <Layout>
          <HCPUsers/>
      </Layout>
    )
  
    }
} 

export default HcpUser;