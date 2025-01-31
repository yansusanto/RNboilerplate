import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Switch,
  Image,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { AppImages, CommonStyle } from '@Theme';
import { CustomText } from '@CommonComponent';
import { useAppContext } from '@AppContext';

const styles = StyleSheet.create({
  outer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontWeight: '500',
  },
  icon: {
    width: 20,
    height: 20,
  },
});

const SettingHeader = (props: { title: string }) => {
  const { appTheme } = useAppContext();
  const { title } = props;
  return (
    <CustomText style={[styles.header, { color: appTheme.lightText }]}>
      {title}
    </CustomText>
  );
};

interface CustomProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: (value: any) => void;
  value: any;
  isSwitch?: boolean;
  isSelected?: boolean;
}
const SettingRow = (props: CustomProps) => {
  const { appTheme } = useAppContext();
  const {
    title,
    style,
    textStyle,
    onPress,
    value,
    isSwitch = false,
    isSelected = false,
  } = props;
  const { outer, icon } = styles;
  return (
    <Pressable
      onPress={() => onPress(value)}
      android_ripple={CommonStyle.androidRipple}>
      <View
        style={[
          outer,
          { backgroundColor: appTheme.card, borderColor: appTheme.border },
          style,
        ]}>
        <CustomText large style={[{ color: appTheme.text }, textStyle]}>
          {title}
        </CustomText>
        {(isSwitch && (
          <Switch onChange={() => onPress(value)} value={value} />
        )) ||
          null}
        {(isSelected && (
          <Image
            source={{ uri: AppImages.tick }}
            style={[icon, { tintColor: appTheme.themeColor }]}
          />
        )) ||
          null}
      </View>
    </Pressable>
  );
};

export { SettingRow, SettingHeader };
