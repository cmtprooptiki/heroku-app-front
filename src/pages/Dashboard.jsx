import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import Welcome from '../components/Welcome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

// import Eksoda from './Eksoda';
import axios from 'axios';
import ApexCharts from 'react-apexcharts';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
// import BuildingMetricsTable from '../components/BuildingMetricsTable';
import { IconContext } from "react-icons";
import { GiBubbles } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import '../dashboard.css';
import { getColorClass2, getLimitAnnotation } from '../components/HelperComponent';
import apiBaseUrl from '../apiConfig';
// import WeeksTableBudget from '../components/WeeksTableBudget';
// import WeeksTableBudget_Est2 from '../components/WeeksTableBudget_Est2';
// import WeeksTableBudget_Est3 from '../components/WeeksTableBudget_Est3';

// Importing calendar library
import { Calendar, momentLocalizer,DateLocalizer ,DnDCalendar} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Modal, Button } from 'react-bootstrap';

import InfoBox from '../components/InfoBox';
import IndicatorsList from '../components/indicators_components/IndicatorsList';

// import PaidList from '../components/paid_components/PaidLists';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

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
