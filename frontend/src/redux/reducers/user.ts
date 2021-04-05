import { USER_LOGIN, USER_LOGIN_FAILED, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER, USER_REGISTER_SUCCESS, USER_REGISTER_FAILED, USER_DETAILS, USER_DETAILS_SUCCESS, USER_DETAILS_FAILED, USER_UPDATE, USER_UPDATE_SUCCESS, USER_UPDATE_FAILED, USER_LIST, USER_LIST_SUCCESS, USER_LIST_FAILED, USER_LIST_RESET, USER_DELETE, USER_DELETE_SUCCESS, USER_DELETE_FAILED } from './../../constant/user';
import myAction from "../../models/Action";
import { UserDelete, UserDetails, UserList, UserLogin } from "../../models/State";


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

const userListReducer = (state = new UserList(false, [], null), action: myAction) => {
  switch (action.type) {
    case USER_LIST:
      return new UserList(true, [], null)
    case USER_LIST_SUCCESS:
      return new UserList(false, action.payload, null)
    case USER_LIST_FAILED:
      return new UserList(false, [], action.payload)
    case USER_LIST_RESET:
      return new UserList(false, [], null)
    default:
      return state;
  }
}

const userDeleteReducer = (state = new UserDelete(false, false, null), action: myAction) => {
  switch (action.type) {
    case USER_DELETE:
      return new UserDelete(true, false, null)
    case USER_DELETE_SUCCESS:
      return new UserDelete(false, true, null)
    case USER_DELETE_FAILED:
      return new UserDelete(false, false, action.payload)
    default:
      return state;
  }
}


export { userLoginReducer, userRegisterReducer, userDetailReducer, userListReducer, userDeleteReducer };
