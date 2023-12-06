import {
  SET_USER_SUCCESS,
  SET_USER_REQUEST,
  SET_USER_FAILED,

  SET_AUTH_CHECKED,
} from './actions';

const initialState = {
  user: null,
  
  isAuthChecked: false,

  success: false,
  loading: false,
  error: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      }

    case SET_USER_SUCCESS:
      return {
        ...state,
        user: {
          email: action.payload.user.email,
          password: action.payload.user.password,
          name: action.payload.user.name,
      },
        success: action.payload.success,
        loading: false,
      }

    case SET_USER_FAILED:
      return {
        ...state,
        success: false,
        error: true,
        loading: false,
      }

    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload
      }

    default:
      return state;
  }
};