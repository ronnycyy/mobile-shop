import { USER_DETAILS, USER_LOGIN, USER_LOGIN_FAILED, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER, USER_REGISTER_FAILED, USER_REGISTER_SUCCESS, USER_DETAILS_FAILED, USER_DETAILS_SUCCESS, USER_UPDATE, USER_UPDATE_SUCCESS, USER_UPDATE_FAILED } from './../../constant/user';
import Action from '../../models/Action';
import { Dispatch } from 'redux';
import axios from 'axios';
import User from '../../models/User';

export const login = (email: string, password: string) => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: USER_LOGIN });

    // 将email和password作为一个json传递给后台
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post('/api/user/login', { email, password }, config);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: new User(data._id, data.name, data.email, data.token, data.password) });

    localStorage.setItem('user', JSON.stringify({ ...data, id: data }));

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const register = (name: string, email: string, password: string) => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: USER_REGISTER });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post('/api/user/register', { name, email, password }, config);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('user', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getUserDetails = () => async (dispatch: Dispatch<Action>, getState: any) => {
  try {
    dispatch({ type: USER_DETAILS });

    const { userLogin: { user } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user ? user.token : ''}`
      }
    }

    const { data } = await axios.get(`/api/user/profile`, config);

    const newUser = new User(data._id, data.name, data.email, data.token,data.password);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: newUser});


  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const updateUserDetails = (updatedUser: User | null) => async (dispatch: Dispatch<Action>, getState: any) => {
  try {
    dispatch({ type: USER_UPDATE });

    const { userLogin: { user } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user ? user.token : ''}`
      }
    }

    const { data } = await axios.put(`/api/user/profile`, updatedUser, config);

    const newUser = new User(data._id, data.name, data.email, data.token, data.password);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: newUser });


  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const logout = () => (dispatch: Dispatch<Action>) => {
  localStorage.removeItem('user');
  dispatch({ type: USER_LOGOUT })
}