import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';

import {useDispatch} from 'react-redux';

import CustomHeader from '../../Header';
import {IPostGetData} from '../../../interfaces/IPost';
import {timeFromNow} from '../../../utils/date_formater';
import {Colors} from '../../../assets/Colors';
import {openModal} from '../../../redux/reducers/modalSlice';

interface PostProps {
  data: IPostGetData;
  username: string;
}

const Post = ({data, username}: PostProps) => {
  const dispatch = useDispatch();

  const checkUser = (): boolean => {
    if (username === data.username) return true;
    else return false;
  };

  const handleDeleteOnPress = useCallback(() => {
    dispatch(openModal({content: 'delete', post: data}));
  }, []);

  const handleEditOnPress = useCallback(() => {
    dispatch(openModal({content: 'edit', post: data}));
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader
        title={data.title}
        secondary={checkUser()}
        handleDeleteButtonAction={handleDeleteOnPress}
        handleEditButtonAction={handleEditOnPress}
      />
      <View style={{width: '100%', paddingHorizontal: 10, paddingVertical: 15}}>
        <View style={styles.txt1Row}>
          <Text style={styles.txt1}> @{data.username} </Text>
          <Text style={styles.txt1}>
            {' '}
            {timeFromNow(data.created_datetime)}{' '}
          </Text>
        </View>
        <Text>{data.content}</Text>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    alignSelf: 'center',
    width: '95%',
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  txt1Row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 5,
  },
  txt1: {
    fontWeight: 'bold',
  },
});
