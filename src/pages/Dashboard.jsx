import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import Welcome from '../components/Welcome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';


import '../dashboard.css';


import IndicatorsList from '../components/indicators_components/IndicatorsList';



const Dashboard = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state=>state.auth));

  useEffect(()=>{
      
      dispatch(getMe());
  },[dispatch]);


  useEffect(()=>{
      if(isError){
          navigate("/");
      }
  },[isError,navigate]);

  const [selectedTable, setSelectedTable] = useState('table1');
  return (
    <Layout>
        <Welcome />
        <IndicatorsList/>
    
    </Layout>
  );
  
};

export default Dashboard;
