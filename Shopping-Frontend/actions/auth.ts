import api from '../utils/api';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';


// Load User
export const loadUser:any = () => async (dispatch:any) => {
  try {
    const res = await api.get('/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = (formData:any) => async (dispatch:any) => {
  try {
    const res = await api.post('/auth/register', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err:any) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error:any) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email:string, password:string) => async (dispatch:any) => {
  const body = { email, password };

  try {
    const res = await api.post('/auth/login', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err:any) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error:any) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//send Password Link

export const sendPassLink = (email:string,setPassword:any) => async (dispatch:any) => {
  const body = { email };

  try {
    
  
   
    const res = await api.post('/auth/sendpasswordlink', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    setPassword(true);

  } catch (err:any) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error:any) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//valdate user
export const validateUser = (id:any,token:any) => async (dispatch:any) => {


  try {
    
  
   
    const res = await api.get(`/auth/forgotpassword/${id}/${token}`);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

  } catch (err:any) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error:any) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const sendPassword = (id:any,token:any,password:any,setMessage:any) => async (dispatch:any) => {
  const body = { password };

  try {
    
  
   
    const res = await api.post(`/auth/${id}/${token}`, body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
   setMessage(true)
  } catch (err:any) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error:any) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });
