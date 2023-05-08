import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface AuthState {
  logged: boolean;
  splash: boolean;
}

const initialState: AuthState = {
  logged: false,
  splash: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeAuthState: (state, action: PayloadAction<boolean>) => {
      state.logged = action.payload;
    },
    exitSplash: state => {
      state.splash = false;
    },
  },
});

export const {changeAuthState, exitSplash} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectauth = (state: RootState) => state.auth;

export default authSlice.reducer;
