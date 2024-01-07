import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo, updateUserInfo, login, logout, registerUser } from "../../utils/api";
import { setUser, setAuthChecked } from "./reducer";

export const getUser = () => (dispatch) => {
    return getUserInfo()
        .then((res) => {
            dispatch(setUser(res.user))
        })
};

export const checkUserAuth = () => (dispatch) => {
    if (localStorage.getItem("accessToken")) {
        dispatch(getUser())
            .catch(() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                dispatch(setUser(null));
            })
            .finally(() => dispatch(setAuthChecked(true)));
    } else {
        dispatch(setAuthChecked(true));
    }
};

export const registrationUser = createAsyncThunk(
    'user/registrationUser',
    async ({email, password, name}) => {
        const res = await registerUser(email, password, name);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res.user;
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({email, name}) => {
        return await updateUserInfo(email, name);
    }
);

export const loginToProfile = createAsyncThunk(
    'user/loginToProfile',
    async ({email, password}) => {
        const res = await login(email, password);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res.user;
    }
);

export const logoutOfProfile = createAsyncThunk(
    'user/logoutOfProfile',
    async () => {
        await logout();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
);
