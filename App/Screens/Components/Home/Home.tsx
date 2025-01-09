/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Layout, IsAlertModal } from '@CommonComponent';
import { useIsFocused } from '@react-navigation/native';
import {
  compareAppVersions,
  getVersionName,
  openLink,
  alertData,
  isIOS,
  width,
} from '@Utils';
import { useAppContext } from '@AppContext';

const Home = () => {
  const { appTheme } = useAppContext();
  const [isUpdate, setIsUpdate] = useState(false);
  let version = getVersionName();
  const alertDetails = alertData.updateVersion;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      checkMinimumVersion();
    }
  }, [isFocused]);

  const checkMinimumVersion = async () => {
    try {
      let shouldUpdate = compareAppVersions({
        version,
        minimumVersion: 'v1.0.0', // Wrap whole try block in if condition with apiConfig.serviceConfig and pass minimumVersion from api response
      });
      if (shouldUpdate) {
        setIsUpdate(true);
        return;
      }
      return;
    } catch (e: any) {
      console.log(e);
    }
  };

  const updateApp = async () => {
    try {
      if (isIOS) {
        await openLink('');
      } else {
        await openLink('');
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <Layout padding={20}>
      <IsAlertModal
        visible={isUpdate}
        data={alertDetails}
        onClose={() => null}
        rightBtn={{
          title: 'Update',
          onPress: updateApp,
          style: {
            borderColor: appTheme.themeColor,
            backgroundColor: appTheme.themeColor,
            borderRadius: 0,
            marginVertical: 0,
            width: width * 0.8,
            marginHorizontal: width * 0.05,
          },
          textColor: appTheme.tint,
        }}
      />
    </Layout>
  );
};

export default Home;
