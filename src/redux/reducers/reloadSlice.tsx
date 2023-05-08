import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {IPostGetData, IResponsePostData} from '../../interfaces/IPost';

interface IToast {
  status: boolean;
  success: boolean;
  message: string;
}
export interface ReloadState {
  reload?: boolean;
  toast: IToast;
  data?: IResponsePostData | null;
}

const initialState: ReloadState = {
  reload: false,
  toast: {
    status: false,
    success: false,
    message: '',
  },
  data: undefined,
};

export const reloadSlice = createSlice({
  name: 'reload',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IResponsePostData | null>) => {
      state.data = action.payload;
    },

    changeReloadState: state => {
      state.reload = !state.reload;
    },

    toggleToastState: (state, action: PayloadAction<boolean>) => {
      state.toast.status = action.payload;
    },

    toggleToastStateSuccess: (state, action: PayloadAction<boolean>) => {
      state.toast.status = action.payload;
      state.toast.status = true;
    },
    toggleToastStateError: (state, action: PayloadAction<boolean>) => {
      state.toast.status = action.payload;
      state.toast.status = false;
    },
  },
});

export const {
  changeReloadState,
  toggleToastStateError,
  toggleToastStateSuccess,
  toggleToastState,
  setData,
} = reloadSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectReload = (state: RootState) => state.reload;

export default reloadSlice.reducer;
