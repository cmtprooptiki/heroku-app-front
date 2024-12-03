import React,{useEffect} from 'react'
import Layout from '../Layout'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../features/authSlice'
import FormAddIndicator from '../../components/indicators_components/FormAddIndicator'

const AddParadoteo = () =>{
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
    return (
        <Layout>
            <FormAddIndicator/>
        </Layout>
    )
}

export default AddParadoteo;