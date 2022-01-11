/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';

import {Text, View, StyleSheet, Animated} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function HomeScreen({fadeAnim}) {
  return (
    <Animated.View style={{...styles.screen, opacity: fadeAnim}}>
      <Text>Home!</Text>
    </Animated.View>
  );
}

function SettingsScreen({fadeAnim}) {
  return (
    <Animated.View style={{...styles.screen, opacity: fadeAnim}}>
      <Text>Settings!</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    margin: 20,
  },
});

const Tab = createBottomTabNavigator();

export const AnimatedFadeThroudh = () => {};

export default function App() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);

  const fadeOut = useCallback(
    navigate => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: false,
      }).start(({finished}) => {
        if (finished) {
          navigate();
        }
      });
    },
    [fadeAnim],
  );

  const resetAnim = useCallback(() => {
    fadeAnim.setValue(0);
  }, [fadeAnim]);

  const listeners = ({navigation, route}) => ({
    tabPress: e => {
      e.preventDefault();
      fadeOut(() => navigation.navigate(route.name));
    },
    focus: e => {
      fadeIn();
    },
  });

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" listeners={listeners}>
          {props => <HomeScreen {...props} fadeAnim={fadeAnim} />}
        </Tab.Screen>
        <Tab.Screen name="Settings" listeners={listeners}>
          {props => <SettingsScreen {...props} fadeAnim={fadeAnim} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
