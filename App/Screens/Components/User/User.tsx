import React from 'react';
import { SafeAreaView } from 'react-native';
import { CommonStyle } from '@Theme';
import { useAppContext } from '@AppContext';

const Users = () => {
  const { appTheme } = useAppContext();
  return (
    <SafeAreaView
      style={[
        CommonStyle.flexContainer,
        CommonStyle.center,
        { backgroundColor: appTheme.background },
      ]}></SafeAreaView>
  );
};

export default Users;
