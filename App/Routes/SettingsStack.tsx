import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '@Components/Settings/Settings';
import { useAppContext } from '@AppContext';
import { useTranslation } from 'react-i18next';

const Stack = createStackNavigator();

const SettingsStack = () => {
  const { appTheme } = useAppContext();
  const { i18n: I18n } = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: true,
        cardOverlayEnabled: true,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          color: appTheme.text,
        },
        headerTintColor: appTheme.text,
        headerStyle: {
          backgroundColor: appTheme.tab,
        },
        presentation: 'card',
      })}>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: I18n.t('SETTINGS'),
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
