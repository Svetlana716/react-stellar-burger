import { getUserInfo, login, logout, registerUser } from "../../utils/api";

export const SET_USER_REQUEST = 'SET_USER_REQUEST';
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const SET_USER_FAILED = 'SET_USER_FAILED';

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";

const setAuthChecked = (value) => ({
    type: SET_AUTH_CHECKED,
    payload: value,
});

const setUser = (user) => ({
    type: SET_USER_SUCCESS,
    payload: user,
  });
  
export const registrationUser = ({name, email, password}) => 
    (dispatch) => {
    dispatch({
        type: SET_USER_REQUEST,
    });
    
    registerUser(name, email, password)
    .then(res => {
        if (res && res.success) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res))
        } else {
            dispatch({
                type: SET_USER_FAILED,
              })
        }
    })
    .catch((err) => {
        console.log(err);
        dispatch({
            type: SET_USER_FAILED,
          })
    })
    .finally(
        dispatch(setAuthChecked(true))
    )
};

export const getUser = () => (dispatch) => {
    dispatch({
        type: SET_USER_REQUEST,
    })

    getUserInfo()
    .then((res) => {
        if (res && res.success) {
        dispatch(setUser(res))
        } else {
            dispatch({
                type: SET_USER_FAILED,
              })
        }
    })
    .catch(() => {
        dispatch({
            type: SET_USER_FAILED,
          })
    })
    .finally(
        dispatch(setAuthChecked(true))
    )
};



export const loginToProfile = (email, password) => (dispatch) => {
    dispatch({
        type: SET_USER_REQUEST,
    })
        login(email, password)
        .then((res) => {
            if (res && res.success) {
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            dispatch(setUser(res))
            } else {
                dispatch({
                    type: SET_USER_FAILED,
                  })
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: SET_USER_FAILED,
              })
        })
        .finally(
            dispatch(setAuthChecked(true))
        )
};

export const logoutOfProfile = (refreshToken) => (dispatch) => {
    dispatch({
        type: SET_USER_REQUEST,
    })
        logout(refreshToken)
        .then((res) => {
            if (res && res.success) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch(setUser(null))
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: SET_USER_FAILED,
              })
        })
};

export const checkUserAuth = () => (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch(setUser(null))
                })
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
};