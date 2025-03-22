import {React,useEffect} from 'react'
import { useAuth } from '../store/Auth'
import { Navigate } from 'react-router-dom';

const Logout = () => {
    const {LogOutUser}=useAuth();
    useEffect(() => {
      LogOutUser();
    }, [LogOutUser]);
    
  return (
    <Navigate to="/"/>
  )
}

export default Logout