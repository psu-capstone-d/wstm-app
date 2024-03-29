import React, {useEffect, useMemo, useRef, useState} from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native'

import {Colors} from 'react-native/Libraries/NewAppScreen'
import {useCurrentActivity, useIsDarkMode} from 'src/hooks'
import Drawer from 'src/components/layout/Drawer'
import {
  AppBar,
  Button,
  IconButton,
  usePaletteColor,
} from '@react-native-material/core'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import {actions, useAppDispatch, useAppSelector} from 'src/store'
import {BaseScreen} from 'src/components/layout/BaseScreen'
import TextContent from 'src/components/activity/TextContent'
import QuestionContent from 'src/components/activity/QuestionContent'
import {CheckedAnswers} from 'src/types'

const makeStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
      flex: 1,
    },
    scrollViewContainer: {
      flex: 1,
    },
    lowerView: {
      height: 90,
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
      paddingRight: 8,
      paddingLeft: 4,
      minWidth: 0,
      height: 'auto',
    },
    hideBackButton: {
      opacity: 0,
    },
  })

export const CourseScreen = () => {
  const dispatch = useAppDispatch()
  const drawerRef = useRef<DrawerLayout>(null)
  const isDarkMode = useIsDarkMode()
  const {activity, module, next, prev} = useCurrentActivity()

  const [readyToAdvance, setReadyToAdvance] = useState(activity.type == 'text')
  const {
    submittedAnswer,
    ui: {drawerIsOpen, drawerIsIdle, drawerWillShow, devMode},
  } = useAppSelector(state => ({
    submittedAnswer: state.submittedAnswers[activity.id],
    ui: state.ui,
  }))
  const [count, setCount] = useState(0)
  const [timeoutId, setTimeoutId] = useState<number>(-1)

  useEffect(() => {
    setReadyToAdvance(
      activity.type == 'text' ||
        (activity.type == 'question' && Boolean(submittedAnswer)),
    )
  }, [activity, submittedAnswer])

  const secondaryColor = usePaletteColor('secondary')
  const styles = useMemo(() => makeStyles(isDarkMode), [isDarkMode])

  const drawerIsOpening = !drawerIsIdle && drawerWillShow
  const drawerIsOpenOrOpening = drawerIsOpen || drawerIsOpening

  const isCourseComplete = activity.id > 0 && !next

  useEffect(() => {
    // this is a hack to make it possible to close the drawer by tapping
    // on the course screen area that is partially scrolled out of view.
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

  useEffect(() => {
    return () => clearTimeout(timeoutId)
  }, [timeoutId])

  const openDrawer = () => drawerRef.current && drawerRef.current.openDrawer()
  const closeDrawer = () => drawerRef.current && drawerRef.current.closeDrawer()

  const onQuestionComplete = (checked: CheckedAnswers) => {
    dispatch(actions.setCheckedAnswers({[activity.id]: checked}))
    setReadyToAdvance(true)
  }

  const onAppBarTouchEnd = () => {
    clearTimeout(timeoutId)
    if (count + 1 == 10) {
      ToastAndroid.show(
        `Developer mode ${devMode ? 'Disabled' : 'Enabled'}`,
        ToastAndroid.SHORT,
      )
      dispatch(actions.toggleDevMode())
      setCount(0)
    } else {
      setCount(count + 1)
      setTimeoutId(
        setTimeout(() => {
          setCount(0)
        }, 5000),
      )
    }
  }

  const topArea = (
    <AppBar
      key="top"
      centerTitle
      onTouchEndCapture={onAppBarTouchEnd}
      title={module.title}
      subtitle={
        activity.type == 'text' || activity.type == 'question'
          ? activity.title
          : ''
      }
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
          disabled={!prev}
          style={!prev && styles.hideBackButton}
          pointerEvents={drawerIsOpenOrOpening ? 'none' : 'auto'}
          onPress={() => {
            return prev && dispatch(actions.setCurrentActivityId(prev.id))
          }}
          icon={props => <Icon name="keyboard-backspace" {...props} />}
          {...props}
        />
      )}
    />
  )

  const mainArea = (
    <View style={styles.container}>
      <View style={styles.scrollViewContainer}>
        <ScrollView key="main" contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            {activity.type == 'text' && <TextContent activity={activity} />}
            {activity.type == 'question' && (
              <QuestionContent
                activity={activity}
                onComplete={onQuestionComplete}
              />
            )}
          </View>
        </ScrollView>
      </View>
      <View style={styles.lowerView}>
        {readyToAdvance && next && (
          <View style={styles.advance}>
            <Button
              contentContainerStyle={styles.advanceButton}
              title=""
              uppercase={false}
              trailing={props => (
                <Icon name="chevron-right" {...props} size={30} />
              )}
              onPress={() => dispatch(actions.setCurrentActivityId(next.id))}
            />
          </View>
        )}
      </View>
    </View>
  )

  const bottomArea = (
    <>
      {isCourseComplete && (
        <AppBar
          title="Course Complete!"
          variant="bottom"
          color={secondaryColor.main}
          tintColor={secondaryColor.on}
          trailing={props => (
            <Button
              title="View Results"
              {...props}
              onPress={() => dispatch(actions.setScreen('results'))}
            />
          )}
        />
      )}
    </>
  )

  return (
    <BaseScreen>
      <Drawer ref={drawerRef}>
        {topArea}
        {mainArea}
        {bottomArea}
      </Drawer>
    </BaseScreen>
  )
}
