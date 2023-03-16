/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useMemo} from 'react'
import {SafeAreaView, StyleSheet, View} from 'react-native'

import {Colors} from 'react-native/Libraries/NewAppScreen'
import {useIsDarkMode} from 'src/hooks'
import BottomNav from './BottomNav'
import {Provider} from 'react-redux'
import { configureStore, Store } from "@reduxjs/toolkit";
import { actions, loadProgressFromFile, reducer, useAppSelector } from "src/store";
import {CourseScreen} from 'src/components/screens/CourseScreen'
import SettingsScreen from 'src/components/screens/SettingsScreen'
import { listenerMiddleware } from "src/listeners/listeners";

const makeStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      flex: 1,
    },
    highlight: {
      fontWeight: '700',
    },
    screenVisible: {
      flex: 1,
      opacity: 1,
      zIndex: 2,
    },
    screen: {
      opacity: 0,
      zIndex: 1,
    },
  })

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

loadProgressFromFile(store)

const App = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  )
}

const Root = () => {
  const isDarkMode = useIsDarkMode()
  const styles = useMemo(() => makeStyles(isDarkMode), [isDarkMode])
  const {
    drawerIsOpen,
    drawerIsIdle,
    drawerIsSettling,
    drawerWillShow,
    currentScreen,
  } = useAppSelector(state => state.ui)
  const visibleScreen = {[currentScreen]: styles.screenVisible}
  const bottomTabsVisible =
    (drawerIsOpen && drawerIsIdle) || (drawerIsSettling && drawerWillShow)
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.screen, visibleScreen.course]}>
        <CourseScreen />
      </View>
      <View style={[styles.screen, visibleScreen.settings]}>
        <SettingsScreen />
      </View>
      {bottomTabsVisible && <BottomNav />}
    </SafeAreaView>
  )
}

export default App
