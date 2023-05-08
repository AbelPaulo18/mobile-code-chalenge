import {StyleSheet, Text, View, Modal} from 'react-native';
import React, {FC} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

interface CustomModalProps {
  children: React.ReactElement;
}

const CustomModal: FC<CustomModalProps> = ({children}) => {
  const dispatch = useDispatch();
  const {content, value, post} = useSelector((state: RootState) => state.modal);
  return (
    <Modal visible={value} transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000099',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {children}
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({});
