import React, {useEffect, useMemo, useRef} from 'react'
import {Pressable, ScrollView, StyleSheet, View} from 'react-native'

import {Colors} from 'react-native/Libraries/NewAppScreen'
import {useCourse, useCurrentActivity, useIsDarkMode} from 'src/hooks'
import Section from 'src/components/layout/Section'
import Drawer from 'src/components/layout/Drawer'
import {
  AppBar,
  Button,
  IconButton,
  PaletteColor,
  usePaletteColor,
} from '@react-native-material/core'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import {actions, useAppDispatch, useAppSelector} from 'src/store'
import {BaseScreen} from 'src/components/layout/BaseScreen'

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
    overlay: {
      ...StyleSheet.absoluteFillObject,
      opacity: 1,
      zIndex: 10000,
    },
    overlayPressable: {
      height: '100%',
    },
    advance: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    advanceButton: {
      paddingVertical: 8,
      minWidth: 0,
      height: 'auto',
    },
    advanceButtonText: {
      fontSize: 19,
    },
    hideBackButton: {
      opacity: 0,
    },
  })

export const CourseScreen = () => {
  const dispatch = useAppDispatch()
  const drawerRef = useRef<DrawerLayout>(null)
  const isDarkMode = useIsDarkMode()
  const course = useCourse()
  const currentActivity = useCurrentActivity()

  const primaryColor = usePaletteColor('primary')
  const secondaryColor = usePaletteColor('secondary')
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
    if (drawerRef.current) {
      // @ts-ignore
      drawerRef.current.renderOverlay = () =>
        // @ts-ignore
        drawerRef.current.drawerShown && (
          <View style={styles.overlay}>
            <Pressable style={styles.overlayPressable} onPress={closeDrawer} />
          </View>
        )
    }
  }, [styles, drawerRef])
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
    <BaseScreen>
      <Drawer ref={drawerRef}>
        <AppBar
          key="top"
          centerTitle
          title={currentActivity.module.title}
          subtitle={currentActivity.activity.title}
          onTouchEnd={drawerIsOpenOrOpening ? closeDrawer : undefined}
          trailing={props => (
            <IconButton
              pointerEvents={drawerIsOpenOrOpening ? 'none' : 'auto'}
              onPress={drawerIsOpenOrOpening ? closeDrawer : openDrawer}
              icon={props => <Icon name="menu" {...props} />}
              {...props}
            />
          )}
          leading={props => (
            <IconButton
              disabled={!currentActivity.prev}
              style={!currentActivity.prev && styles.hideBackButton}
              pointerEvents={drawerIsOpenOrOpening ? 'none' : 'auto'}
              onPress={() =>
                currentActivity.prev &&
                dispatch(actions.setCurrentActivityId(currentActivity.prev.id))
              }
              icon={props => <Icon name="keyboard-backspace" {...props} />}
              {...props}
            />
          )}
        />
        <ScrollView
          key="main"
          contentInsetAdjustmentBehavior="automatic"
          style={styles.container}>
          <View style={styles.container}>
            {currentActivity.activity.type == 'text' && (
              <Section title={currentActivity.activity.title}>
                {currentActivity.activity.text}
              </Section>
            )}
          </View>
        </ScrollView>
        {currentActivity.next && (
          <View style={styles.advance}>
            <Button
              contentContainerStyle={styles.advanceButton}
              titleStyle={styles.advanceButtonText}
              title={currentActivity.next.title}
              uppercase={false}
              trailing={props => (
                <Icon name="chevron-right" {...props} size={30} />
              )}
              onPress={() =>
                currentActivity.next &&
                dispatch(actions.setCurrentActivityId(currentActivity.next.id))
              }
            />
          </View>
        )}
        {currentActivity.activity.id > 0 && !currentActivity.next && (
          <AppBar
            title={`${course.name} Complete!`}
            variant="bottom"
            color={secondaryColor.main}
            tintColor={secondaryColor.on}
          />
        )}
      </Drawer>
    </BaseScreen>
  )
}
