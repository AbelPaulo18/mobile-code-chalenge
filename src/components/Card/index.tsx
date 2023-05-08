import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {Control, useForm} from 'react-hook-form';

import CustomInput from '../Input';
import {Colors} from '../../assets/Colors';
import CustomButton from '../Button';
import {IPostData} from '../../interfaces/IPost';
import postDataHook from '../../actions/api/PostData';
import updateDataHook from '../../actions/api/updateData';
import CustomToast from '../Toast';

import {
  changeReloadState,
  toggleToastStateSuccess,
} from '../../redux/reducers/reloadSlice';
import {closeModal} from '../../redux/reducers/modalSlice';
import {RootState} from '../../redux/store';
import deleteDataHook from '../../actions/api/deleteData';

interface PostCardProps {
  title: string;
  edit?: boolean;
  username: string;
  noInputs?: boolean;
}

type FormField = {
  title: string;
  content: string;
};

const PostCard = ({title, edit, username, noInputs}: PostCardProps) => {
  const dispatch = useDispatch();
  const {post} = useSelector((state: RootState) => state.modal);

  const {control, watch, handleSubmit} = useForm<FormField>({});

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handlePost = async (data: FormField) => {
    const postData: IPostData = {
      content: data.content,
      title: data.title,
      username: username,
    };
    const {success} = !edit
      ? await postDataHook({url: '/', bodyObject: postData})
      : await updateDataHook({url: `/${post?.id}/`, bodyObject: postData});

    if (success) {
      dispatch(toggleToastStateSuccess(true));
      dispatch(changeReloadState());
      edit ? handleCloseModal() : null;
    }
  };

  const handleDelete = async () => {
    const {success} = await deleteDataHook({url: `/${post?.id}/`});

    if (success) {
      dispatch(toggleToastStateSuccess(true));
      dispatch(changeReloadState());
      handleCloseModal();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> {title} </Text>
      {!noInputs ? (
        <>
          <CustomInput
            control={control}
            title="Title"
            placeholder="Hello world"
            name="title"
          />
          <CustomInput
            control={control}
            title="Content"
            placeholder="content"
            name="content"
            inputProps={{multiline: true}}
          />
        </>
      ) : null}

      <View style={{alignSelf: 'flex-end'}}>
        {!noInputs ? (
          !edit ? (
            <CustomButton
              title="Create"
              handleOnPress={handleSubmit(handlePost)}
              disabled={
                watch('content') === '' ||
                (undefined && watch('title') === '') ||
                undefined
                  ? true
                  : false
              }
            />
          ) : (
            <View
              style={{
                flexDirection: 'row',
                width: '45%',
                marginTop: 5,
                justifyContent: 'space-between',
              }}>
              <CustomButton
                title="Cancel"
                outline
                handleOnPress={handleCloseModal}
                disabled={false}
              />
              <CustomButton
                title="Save"
                style={{backgroundColor: Colors.green, marginHorizontal: 5}}
                handleOnPress={handleSubmit(handlePost)}
                disabled={false}
              />
            </View>
          )
        ) : (
          <View
            style={{
              flexDirection: 'row',
              width: '45%',
              marginTop: 5,
              justifyContent: 'space-between',
            }}>
            <CustomButton
              title="Cancel"
              outline
              handleOnPress={handleCloseModal}
              disabled={false}
            />
            <CustomButton
              title="Delete"
              style={{backgroundColor: Colors.red, marginHorizontal: 5}}
              handleOnPress={handleDelete}
              disabled={false}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    width: '96%',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 5,
    color: Colors.black,
  },
});
