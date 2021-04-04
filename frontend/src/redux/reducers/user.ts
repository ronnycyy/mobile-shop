import { USER_LOGIN, USER_LOGIN_FAILED, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER, USER_REGISTER_SUCCESS, USER_REGISTER_FAILED, USER_DETAILS, USER_DETAILS_SUCCESS, USER_DETAILS_FAILED, USER_UPDATE, USER_UPDATE_SUCCESS, USER_UPDATE_FAILED } from './../../constant/user';
import myAction from "../../models/Action";
import { UserDetails, UserLogin } from "../../models/State";


const userLoginReducer = (state = new UserLogin(false, null, null), action: myAction) => {
  switch (action.type) {
    case USER_LOGIN:
      return { loading: true, error: null, user: null }
    case USER_LOGIN_SUCCESS:
      return { loading: false, error: null, user: action.payload }
    case USER_LOGIN_FAILED:
      return { loading: false, error: action.payload, user: null }
    case USER_LOGOUT:
      return new UserLogin(false, null, null)
    default:
      return state;
  }
}

const userRegisterReducer = (state = new UserLogin(false, null, null), action: myAction) => {
  switch (action.type) {
    case USER_REGISTER:
      return { loading: true, error: null, user: null }
    case USER_REGISTER_SUCCESS:
      return { loading: false, error: null, user: action.payload }
    case USER_REGISTER_FAILED:
      return { loading: false, error: action.payload, user: null }
    default:
      return state;
  }
}


const userDetailReducer = (state = new UserLogin(false, null, null), action: myAction) => {
  switch (action.type) {
    case USER_DETAILS:
      return new UserDetails(true, null, null, false)
    case USER_DETAILS_SUCCESS:
      return new UserDetails(false, action.payload, null, false)
    case USER_DETAILS_FAILED:
      return new UserDetails(false, null, action.payload, false)
    case USER_UPDATE:
      return new UserDetails(true, null, null, false)
    case USER_UPDATE_SUCCESS:
      return new UserDetails(false, action.payload, null, true)
    case USER_UPDATE_FAILED:
      return new UserDetails(false, null, action.payload, false)
    default:
      return state;
  }
}


export { userLoginReducer, userRegisterReducer, userDetailReducer };
