/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Image } from 'react-native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '@Components/Home/Home';
import Search from '@Components/Search/Search';
import Users from '@Components/User/User';
import SettingsStack from '@Routes/SettingsStack';
import { AppImages } from '@Theme';
import { useAppContext } from '@AppContext';

const Tab = createBottomTabNavigator();

enum tabs {
  HomeTab = 'HOME',
  SearchTab = 'SEARCH',
  UsersTab = 'USERS',
  SettingsTab = 'SETTINGS',
}

const TABS = [
  {
    title: tabs.HomeTab,
    icon: AppImages.home,
    screen: Home,
    name: 'home',
  },
  {
    title: tabs.SearchTab,
    icon: AppImages.search,
    screen: Search,
    name: 'search',
  },
  {
    title: tabs.UsersTab,
    icon: AppImages.user,
    screen: Users,
    name: 'user',
  },
  {
    title: tabs.SettingsTab,
    icon: AppImages.settings,
    screen: SettingsStack,
    name: 'settings',
  },
];

const AppTab = () => {
  const { appTheme } = useAppContext();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarInactiveTintColor: appTheme.gray,
        tabBarStyle: {
          backgroundColor: appTheme.tab,
        },
      }}>
      {TABS.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.screen}
          options={(): BottomTabNavigationOptions => ({
            headerShown: false,
            title: tab.title, // Add this line
            tabBarActiveTintColor: appTheme.themeColor,
            tabBarLabel: tab.title, // This should use the title from enum
            tabBarIcon: ({ focused, size }) => (
              <Image
                resizeMode="contain"
                source={{ uri: tab.icon }}
                style={{
                  height: size,
                  width: size,
                  tintColor:
                    (focused && appTheme.themeColor) || appTheme.lightText,
                }}
              />
            ),
          })}
        />
      ))}
    </Tab.Navigator>
  );
};

export { AppTab, tabs };
