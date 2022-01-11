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

function HomeScreen({navigation, route, fadeIn, fadeOut, fadeAnim, resetAnim}) {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      console.log('Focus Home ', e);
      e.preventDefault();
      fadeOut(() => navigation.navigate(route.name));
    });
    return unsubscribe;
  }, [navigation, fadeOut, route]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', e => {
      console.log('Focus Home ', e);
      fadeIn();
    });
    return unsubscribe;
  }, [navigation, fadeIn]);

  return (
    <Animated.View style={{...styles.screen, opacity: fadeAnim}}>
      <Text>Home!</Text>
    </Animated.View>
  );
}

function SettingsScreen({
  navigation,
  route,
  fadeAnim,
  fadeOut,
  fadeIn,
  resetAnim,
}) {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      console.log('Tab Settings  ', e);
      e.preventDefault();
      fadeOut(() => navigation.navigate(route.name));
    });
    return unsubscribe;
  }, [navigation, fadeOut, route]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', e => {
      console.log('Focus Settings: ', e);
      fadeIn();
    });
    return unsubscribe;
  }, [navigation, fadeIn]);

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

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home">
          {props => (
            <HomeScreen
              {...props}
              fadeAnim={fadeAnim}
              fadeIn={fadeIn}
              fadeOut={fadeOut}
              resetAnim={resetAnim}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Settings">
          {props => (
            <SettingsScreen
              {...props}
              fadeAnim={fadeAnim}
              fadeIn={fadeIn}
              fadeOut={fadeOut}
              resetAnim={resetAnim}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
