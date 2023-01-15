import React, {useEffect, useMemo, useRef} from 'react'
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

import {Colors} from 'react-native/Libraries/NewAppScreen'
import {useCurrentActivity, useIsDarkMode} from '../../hooks'
import Section from '../layout/Section'
import Drawer from '../layout/Drawer'
import {
  AppBar,
  IconButton,
  PaletteColor,
  usePaletteColor,
} from '@react-native-material/core'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import {useAppSelector} from '../../store'

const makeStyles = (isDarkMode: boolean, primaryColor: PaletteColor) =>
  StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
      flex: 1,
    },
    footer: {
      backgroundColor: primaryColor.main,
    },
    highlight: {
      fontWeight: '700',
    },
  })

export const CourseScreen = () => {
  const drawerRef = useRef<DrawerLayout>(null)
  const isDarkMode = useIsDarkMode()
  const [currentActivity, currentModule] = useCurrentActivity()
  const primaryColor = usePaletteColor('primary')
  const styles = useMemo(
    () => makeStyles(isDarkMode, primaryColor),
    [isDarkMode, primaryColor],
  )
  const {drawerIsOpen, drawerIsIdle, drawerWillShow} = useAppSelector(
    state => state.ui,
  )
  const drawerIsOpening = !drawerIsIdle && drawerWillShow
  const drawerIsOpenOrOpening = drawerIsOpen || drawerIsOpening
  useEffect(() => {
    // @ts-ignore
    if (drawerRef.current) {
      // @ts-ignore
      drawerRef.current.renderOverlay = () =>
        // @ts-ignore
        drawerRef.current.drawerShown && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              opacity: 1,
              zIndex: 10000,
            }}>
            <Pressable style={{height: '100%'}} onPress={closeDrawer} />
          </View>
        )
    }
  }, [drawerRef])
  const openDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.openDrawer()
    }
  }
  const closeDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.closeDrawer()
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Drawer ref={drawerRef}>
        <AppBar
          title={currentModule.title}
          subtitle={currentActivity.title}
          onTouchEnd={drawerIsOpenOrOpening ? closeDrawer : undefined}
          leading={props => (
            <IconButton
              pointerEvents={drawerIsOpenOrOpening ? 'none' : 'auto'}
              onPress={drawerIsOpenOrOpening ? closeDrawer : openDrawer}
              icon={props => <Icon name="menu" {...props} />}
              {...props}
            />
          )}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.container}>
          <View style={styles.container}>
            {currentActivity && currentActivity.type == 'text' && (
              <Section title={currentActivity.title}>
                {currentActivity.text}
              </Section>
            )}
          </View>
        </ScrollView>
      </Drawer>
    </SafeAreaView>
  )
}
