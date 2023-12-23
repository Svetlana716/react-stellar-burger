import { getUserInfo, changeUserInfo, login, logout, registerUser } from "../../utils/api";

export const SET_USER_REQUEST = 'SET_USER_REQUEST';
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const SET_USER_FAILED = 'SET_USER_FAILED';
export const RESET_USER = 'RESET_USER';

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";

const setAuthChecked = (value) => ({
    type: SET_AUTH_CHECKED,
    payload: value,
});

const setUser = (user) => ({
    type: SET_USER_SUCCESS,
    payload: user,
});

export const registrationUser = (email, password, name) => (dispatch) => {
        dispatch({
            type: SET_USER_REQUEST,
        });

        registerUser(email, password, name)
            .then(res => {
                localStorage.setItem("accessToken", res.accessToken);
                localStorage.setItem("refreshToken", res.refreshToken);
                dispatch(setUser(res))
            })
            .catch((res) => {
                dispatch({
                    type: SET_USER_FAILED,
                    payload: res,
                })
            })
            .finally(() => {
                dispatch(setAuthChecked(true));
              });
    };

export const getUser = () => (dispatch) => {
    dispatch({
        type: SET_USER_REQUEST,
    });

    return getUserInfo()
        .then((res) => {
            dispatch(setUser(res))
        })
        .catch((res) => {
            dispatch({
                type: SET_USER_FAILED,
                payload: res,
            })
        })
        .finally(() => {
            dispatch(setAuthChecked(true));
          });
};

export const changeUser = (email, name) => (dispatch) => {
    dispatch({
        type: SET_USER_REQUEST,
    })

    return changeUserInfo(email, name)
        .then((res) => {
            dispatch(setUser(res))
        })
        .catch((res) => {
            dispatch({
                type: SET_USER_FAILED,
                payload: res,
            })
        })
        .finally(() => {
            dispatch(setAuthChecked(true));
          });
};

export const loginToProfile = (email, password) => (dispatch) => {
    dispatch({
        type: SET_USER_REQUEST,
    });

    login(email, password)
        .then((res) => {
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            dispatch(setUser(res))
        })
        .catch((res) => {
            dispatch({
                type: SET_USER_FAILED,
                payload: res,
            })
        })
        .finally(() => {
            dispatch(setAuthChecked(true));
          });
};

export const logoutOfProfile = () => (dispatch) => {
    dispatch({
        type: SET_USER_REQUEST,
    });

    return logout()
        .then(() => {
            dispatch({
                type: RESET_USER,
            });
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        })
        .catch((res) => {
            dispatch({
                type: SET_USER_FAILED,
                payload: res,
            })
        })
};

export const checkUserAuth = () => (dispatch) => {
    if (localStorage.getItem("accessToken")) {
        dispatch(getUser())
            .catch(() => {
                dispatch({
                    type: RESET_USER,
                });
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                
            })
            .finally(() => dispatch(setAuthChecked(true)));
    } else {
        dispatch(setAuthChecked(true));
    }
};