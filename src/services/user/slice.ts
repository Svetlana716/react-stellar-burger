import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUserInfo, updateUserInfo, login, logout, registerUser } from "../../utils/api";
import { UserType, FetchRegistrationOrAuthorizationUserSuccessType, FetchGetOrUpdateUserSuccessType, FetchLogoutOfProfileSuccessType, FetchErrorType } from '../../utils/types';

export const getUser = createAsyncThunk/* <FetchGetOrUpdateUserSuccessType, undefined, { rejectValue: FetchErrorType }> */(
  'user/getUser',
  async () => {
    try {
      const res = await getUserInfo();
      setUser(res.user)
    } catch (err) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
    } finally {
      setAuthChecked(true)
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async () => {
    if (localStorage.getItem("accessToken")) {
      getUser()
  } else {
      setAuthChecked(true);
  }
  }
);

export const registrationUser = createAsyncThunk<FetchRegistrationOrAuthorizationUserSuccessType, {email: string, password: string, name: string}, { rejectValue: FetchErrorType }>(
    'user/registrationUser',
    async ({email, password, name}) => {
        const res = await registerUser(email, password, name);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res;
    }
);

export const updateUser = createAsyncThunk<FetchGetOrUpdateUserSuccessType, {email: string, name: string}, { rejectValue: FetchErrorType }>(
    'user/updateUser',
    async ({email, name}) => {
        return await updateUserInfo(email, name);
    }
);

export const loginToProfile = createAsyncThunk<FetchRegistrationOrAuthorizationUserSuccessType, {email: string, password: string}, { rejectValue: FetchErrorType }>(
    'user/loginToProfile',
    async ({email, password}) => {
        const res = await login(email, password);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res;
    }
);

export const logoutOfProfile = createAsyncThunk<FetchLogoutOfProfileSuccessType, undefined, { rejectValue: FetchErrorType }>(
    'user/logoutOfProfile',
    async () => {
        const res = await logout();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return res;
        
    }
);

type UserStateType = {
  user: UserType | null;
  isAuthChecked: boolean;
  
  loading: boolean;
  error: string | null | undefined;
};

const initialState: UserStateType = {
  user: null,
  isAuthChecked: false,

  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserType | null>) {
      state.user = action.payload;
    },
    setAuthChecked(state, action: PayloadAction<boolean>) {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registrationUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registrationUser.fulfilled, (state, {payload}) => {
        state.user = payload.user;
        state.isAuthChecked = true;
        state.loading = false;
      })
      .addCase(registrationUser.rejected, (state, {error}) => {
        state.loading = false;
        if (error) state.error = error.message;
      })
      
      .addCase(loginToProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginToProfile.fulfilled, (state, {payload}) => {
        state.user = payload.user;
        state.isAuthChecked = true;
        state.loading = false;
      })
      .addCase(loginToProfile.rejected, (state, {error}) => {
        state.loading = false;
        if (error) state.error = error.message;
      })
      
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, {payload}) => {
        state.user = payload.user;
        state.isAuthChecked = true;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, {error}) => {
        state.loading = false;
        if (error) state.error = error.message;
      })

      .addCase(logoutOfProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutOfProfile.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = true;
        state.loading = false;
      })
      .addCase(logoutOfProfile.rejected, (state, {error}) => {
        state.loading = false;
         if (error) state.error = error.message;
      })
  }
});

const { setUser, setAuthChecked } = userSlice.actions;

export const userReducer = userSlice.reducer;
