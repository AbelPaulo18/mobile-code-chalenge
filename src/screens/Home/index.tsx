import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useSelector, useDispatch} from 'react-redux';

import CustomHeader from '../../components/Header';
import PostCard from '../../components/Card';
import {RootState} from '../../redux/store';
import {fetchDataHook} from '../../actions/api/FetchData';
import {IResponsePostData} from '../../interfaces/IPost';
import Post from '../../components/Card/Post';
import {getAsyncStorageData} from '../../utils';
import CustomToast from '../../components/Toast';
import {dimension} from '../../utils/constants';
import CustomModal from '../../components/Modal';
import {Colors} from '../../assets/Colors';
import {setData} from '../../redux/reducers/reloadSlice';
import PaginationButton from '../../components/Button/PaginationButton';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {reload, toast, data} = useSelector((state: RootState) => state.reload);
  const {value, content} = useSelector((state: RootState) => state.modal);

  const [username, setUserName] = useState<string>('');

  async function getPosts() {
    const {data, success} = await fetchDataHook<IResponsePostData | null>('/');
    dispatch(setData(data));

    username ? null : setUserName((await getAsyncStorageData()) as string);
  }

  useEffect(() => {
    getPosts();
  }, [reload]);

  return (
    <SafeAreaView style={styles.body}>
      <CustomHeader title="CodeLeap Network" />

      {toast.status && (
        <CustomToast
          success={toast.success}
          message={!toast.success ? 'Post updated!' : 'Post Created!'}
        />
      )}
      <View>
        {value && (
          <CustomModal>
            {content !== 'edit' ? (
              <PostCard title="Edit item" username={username} edit />
            ) : (
              <PostCard title="Edit item" username={username} noInputs />
            )}
          </CustomModal>
        )}
        <ScrollView
          contentContainerStyle={{
            width: '100%',
            paddingBottom: dimension.height / 5,
          }}>
          <PostCard username={username} title="What's on your mind?" />
          {data?.results.map(item => (
            <Post data={item} key={item.id} username={username} />
          ))}
          <View style={styles.paginationContainer}>
            <PaginationButton
              url={data?.previous}
              content={'Previous'}
              disabled={data?.previous === null ? true : false}
            />
            <PaginationButton
              url={data?.next as string}
              content={'Next'}
              disabled={data?.next === null ? true : false}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '96%',
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 5,
    padding: 2,
  },
});
