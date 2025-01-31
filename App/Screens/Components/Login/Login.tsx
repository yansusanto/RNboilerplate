import React, { useRef, useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppImages, CommonStyle } from '@Theme';
import {
  Authentication,
  fontSizes,
  goToNextScreen,
  setItemInStorage,
} from '@Utils';
import { BottomView, ButtonComponent } from '@SubComponents';
import { CustomText } from '@CommonComponent';
import { Route } from '@Routes/AppRoutes';
import { useAppContext } from '@AppContext';
import { I18n } from '@Localization';

const styles = StyleSheet.create({
  outer: {
    width: '85%',
    alignSelf: 'center',
    flex: 1,
    marginTop: 130,
  },
  title: {
    marginVertical: 20,
    textAlign: 'center',
  },
  btnText: {
    textAlign: 'right',
    paddingVertical: 5,
  },
  marginTop: {
    marginTop: 50,
    minWidth: 160,
  },
  flexDirection: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
});

const Login = () => {
  const { appTheme } = useAppContext();
  const navigation = useNavigation();
  const [state, setState] = useState({
    email: '',
    password: '',
    isSecureTextEntry: true,
    isProcessing: false,
  });
  const { email, password, isSecureTextEntry, isProcessing } = state;

  const refEmail = useRef<any>(null);
  const refPassword = useRef<any>(null);

  const { outer, title, btnText, marginTop, flexDirection, flex } = styles;
  const { input, flexContainer, center, inputIcon, inputImg } = CommonStyle;
  const inputStyle = [
    input,
    {
      color: appTheme.text,
      borderColor: appTheme.border,
    },
  ];

  const onSubmitEditing = (refName: any) => {
    if (refName) {
      refName.focus();
    }
  };

  const onChangeText = (text: string, type: string) => {
    setState({
      ...state,
      [type]: text,
    });
  };

  const onShowPassword = () => {
    setState({
      ...state,
      isSecureTextEntry: !isSecureTextEntry,
    });
  };

  const manageProcessing = (isProcessingState: boolean) => {
    setState({
      ...state,
      isProcessing: isProcessingState,
    });
  };

  const onLogin = () => {
    try {
      // Field Validation
      // Make api call ans store user in redux and token in Storage
      goToNextScreen(navigation, Route.HomeScreen);
      setItemInStorage(Authentication.TOKEN, 'set login token');
    } catch (error) {
      manageProcessing(false);
    }
  };

  return (
    <SafeAreaView
      style={[flexContainer, { backgroundColor: appTheme.background }]}>
      <View style={[flexContainer, center]}>
        <View style={outer}>
          <CustomText xxlarge style={[title, { color: appTheme.text }]}>
            {I18n.t('SIGN_IN')}
          </CustomText>
          <TextInput
            onChangeText={(text: string) => onChangeText(text, 'email')}
            value={email}
            autoCapitalize="none"
            placeholder="Email"
            style={inputStyle}
            placeholderTextColor={appTheme.lightText}
            underlineColorAndroid={appTheme.transparent}
            keyboardType="email-address"
            returnKeyType="next"
            ref={refEmail}
            onSubmitEditing={() => onSubmitEditing('refPassword')}
          />
          <View style={flexDirection}>
            <TextInput
              onChangeText={(text: string) => onChangeText(text, 'password')}
              value={password}
              autoCapitalize="none"
              placeholder="Password"
              style={[inputStyle, flex]}
              placeholderTextColor={appTheme.lightText}
              underlineColorAndroid={appTheme.transparent}
              secureTextEntry={isSecureTextEntry}
              returnKeyType="done"
              ref={refPassword}
              onSubmitEditing={onLogin}
            />
            <Pressable
              onPress={onShowPassword}
              android_ripple={CommonStyle.androidRipple}>
              <View
                style={{
                  ...center,
                  ...inputIcon,
                  borderBottomColor: appTheme.border,
                }}>
                <Image
                  resizeMode="contain"
                  source={{
                    uri:
                      (isSecureTextEntry && AppImages.passwordOpen) ||
                      AppImages.passwordClosed,
                  }}
                  style={inputImg}
                />
              </View>
            </Pressable>
          </View>
          <CustomText style={[btnText, { color: appTheme.lightText }]}>
            Forgot Password?
          </CustomText>
          <ButtonComponent
            title="Log in"
            isProcessing={isProcessing}
            onPress={onLogin}
            style={marginTop}
            borderRadius={4}
          />
          <BottomView
            title="Need to create an account?"
            subTitle="Sign up here"
            onSubTitle={() => console.log('go to signup')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
