import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {IPostData, IPostGetData} from '../../interfaces/IPost';

// Define a type for the slice state
interface ModalState {
  value?: boolean;
  content?: 'delete' | 'edit';
  post?: IPostGetData;
}

// Define the initial state using that type
const initialState: ModalState = {
  value: false,
};

export const modalSlice = createSlice({
  name: 'toggle modal',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalState>) => {
      state.value = true;
      state.content = action.payload.content;
      state.post = action.payload.post;
    },
    closeModal: state => {
      state.value = false;
    },
  },
});

export const {closeModal, openModal} = modalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectModal = (state: RootState) => state.modal.value;

export default modalSlice.reducer;
