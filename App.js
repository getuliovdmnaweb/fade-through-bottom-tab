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

function HomeScreen({fadeAnim, scale}) {
  return (
    <Animated.View
      style={{...styles.screen, opacity: fadeAnim, transform: [{scale}]}}>
      <Text>Home!</Text>
    </Animated.View>
  );
}

function SettingsScreen({fadeAnim, scale}) {
  return (
    <Animated.View
      style={{...styles.screen, opacity: fadeAnim, transform: [{scale}]}}>
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
  const scale = useRef(new Animated.Value(0.92)).current;

  const fadeIn = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scale]);

  const fadeOut = useCallback(
    navigate => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.92,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(({finished}) => {
        if (finished) {
          navigate();
        }
      });
    },
    [fadeAnim, scale],
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
          {props => <HomeScreen {...props} fadeAnim={fadeAnim} scale={scale} />}
        </Tab.Screen>
        <Tab.Screen name="Settings" listeners={listeners}>
          {props => (
            <SettingsScreen {...props} fadeAnim={fadeAnim} scale={scale} />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
