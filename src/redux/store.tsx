import {configureStore} from '@reduxjs/toolkit';
import ReloadReducer from './reducers/reloadSlice';
import AuthReducer from './reducers/authSlice';
import ModalReducer from './reducers/modalSlice';

export const store = configureStore({
  reducer: {
    reload: ReloadReducer,
    auth: AuthReducer,
    modal: ModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
