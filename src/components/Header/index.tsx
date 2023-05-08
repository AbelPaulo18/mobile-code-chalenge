import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useDispatch} from 'react-redux';

import {Colors} from '../../assets/Colors';
import {DeleteIcon, EditIcon} from '../../assets/icon';
import {getAsyncStorageData, removeAsyncStorageValue} from '../../utils';
import {changeAuthState} from '../../redux/reducers/authSlice';

interface CustomHeaderProps {
  title: string;
  secondary?: boolean;
  handleEditButtonAction?: () => void;
  handleDeleteButtonAction?: () => void;
}

const CustomHeader = ({
  title,
  secondary,
  handleDeleteButtonAction,
  handleEditButtonAction,
}: CustomHeaderProps) => {
  const dispatch = useDispatch();

  const [username, setUserName] = useState<string | undefined>();
  const getUser = async () => {
    setUserName(await getAsyncStorageData());
  };

  const handleLogout = async () => {
    await removeAsyncStorageValue();
    dispatch(changeAuthState(false));
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}> {title} </Text>

      {!secondary && (
        <View
          style={{
            flexDirection: 'row',
            width: '25%',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 16, fontWeight: '300', color: Colors.white}}>
            {username}
          </Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: Colors.white}}>
              logout
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {secondary && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleEditButtonAction}>
            <Image source={DeleteIcon} style={styles.button} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteButtonAction}>
            <Image source={EditIcon} style={styles.button} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 55,
    paddingHorizontal: 10,
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '22%',
  },
  button: {
    padding: 4,
  },
});
