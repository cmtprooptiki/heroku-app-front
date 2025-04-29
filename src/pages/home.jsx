import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import Welcome from '../components/Welcome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';


// import '../dashboard.css';


import IndicatorsList from '../components/indicators_components/IndicatorsList';



const Home = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
//   const {isError} = useSelector((state=>state.auth));
  console.log(user, "user")

  useEffect(()=>{
      
      dispatch(getMe());
  },[dispatch]);

  useEffect(() => {

    if(user)
    {
    
          if(user.role === "hcp")
            {
              navigate("/hcproviders")
            }
          
            if(user.role === "indicator" || user.role === "admin")
              {
                navigate("/dashboard")
              }
    }
      }, [user]);

 

 

  // useEffect(()=>{
  //     if(isError){
  //         navigate("/");
  //     }
  // },[isError,navigate]);

  const [selectedTable, setSelectedTable] = useState('table1');
  // return (
  //   <Layout>
  //       <Welcome />
  //   </Layout>
  // );
  
};

export default Home;
