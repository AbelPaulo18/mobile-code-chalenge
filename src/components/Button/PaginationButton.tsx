import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {useDispatch} from 'react-redux';

import axios from 'axios';
import {setData} from '../../redux/reducers/reloadSlice';
import {Colors} from '../../assets/Colors';

interface PaginationButtonProps {
  url: string;
  content: any;
  disabled: boolean;
}

const PaginationButton = ({content, url, disabled}: PaginationButtonProps) => {
  const dispatch = useDispatch();

  const handlePagination = async () => {
    try {
      await axios.get(url).then(res => dispatch(setData(res.data)));
    } catch (error) {
      console.error(error.message);
      dispatch(setData(null));
    }
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePagination}
      disabled={disabled}>
      <Text>{content}</Text>
    </TouchableOpacity>
  );
};

export default PaginationButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    elevation: 1,
  },
});
