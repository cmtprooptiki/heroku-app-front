import React,{useEffect} from 'react'
import Layout from '../Layout'

import HCProvidersList from '../../components/HCProviders_components/HCProvidersList'

import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../features/authSlice'

const HCProviders = () => {
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

  
  return (
    <Layout>
        <HCProvidersList/>
    </Layout>
  )
} 

export default HCProviders;