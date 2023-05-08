import React from 'react';
import {useDispatch} from 'react-redux';

interface DispatcherProp {
  dispatchFunction: any;
}

export const Dispatcher: React.FC<DispatcherProp> = ({dispatchFunction}) => {
  const dispatch = useDispatch();

  dispatch(dispatchFunction());
  return <></>;
};
