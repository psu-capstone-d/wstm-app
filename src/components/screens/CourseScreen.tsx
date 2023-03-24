import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Pressable, ScrollView, StyleSheet, View} from 'react-native'

import {Colors} from 'react-native/Libraries/NewAppScreen'
import {useCourse, useCurrentActivity, useIsDarkMode} from 'src/hooks'
import Drawer from 'src/components/layout/Drawer'
import {
  AppBar,
  Button,
  IconButton,
  Text,
  usePaletteColor,
} from '@react-native-material/core'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import {actions, useAppDispatch, useAppSelector} from 'src/store'
import {BaseScreen} from 'src/components/layout/BaseScreen'
import TextContent from 'src/components/activity/TextContent'
import QuestionContent from 'src/components/activity/QuestionContent'
import {CheckedAnswers, QuestionActivity} from 'src/types'
import { demoActivities } from 'src/fixtures'

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
    button: {
      marginTop: 20,
      marginHorizontal: 20,
    },
  })

export const CourseScreen = () => {
  const dispatch = useAppDispatch()
  const drawerRef = useRef<DrawerLayout>(null)
  const isDarkMode = useIsDarkMode()
  const course = useCourse()
  const {activity, module, next, prev} = useCurrentActivity()

  const [readyToAdvance, setReadyToAdvance] = useState(activity.type == 'text')
  const submittedAnswer = useAppSelector(
    state => state.submittedAnswers[activity.id],
  )
  useEffect(() => {
    setReadyToAdvance(
      activity.type == 'text' ||
        (activity.type == 'question' && Boolean(submittedAnswer)),
    )
  }, [activity, submittedAnswer])

  const secondaryColor = usePaletteColor('secondary')
  const styles = useMemo(() => makeStyles(isDarkMode), [isDarkMode])

  const {drawerIsOpen, drawerIsIdle, drawerWillShow} = useAppSelector(
    state => state.ui,
  )
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

  const openDrawer = () => drawerRef.current && drawerRef.current.openDrawer()
  const closeDrawer = () => drawerRef.current && drawerRef.current.closeDrawer()

  const onQuestionComplete = (checked: CheckedAnswers) => {
    dispatch(actions.saveCheckedAnswers({activityId: activity.id, checked}))
    setReadyToAdvance(true)
  }

  const activitySubtitle = activity.type == 'text' || activity.type == 'question'
  ? activity.title
  : '';

  const topArea = (
    <AppBar
      key="top"
      centerTitle
      title={isCourseComplete ? "Results" : module.title}
      subtitle={ isCourseComplete ? undefined : activitySubtitle }
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

  const questions = demoActivities.filter(a => a.type === 'question') as QuestionActivity[];
  const submittedAnswers = useAppSelector(state => state.submittedAnswers);
  const correct = questions.reduce(
    (p, q) => {
      if (q.id && submittedAnswers[q.id]) {
        const isAnswerCorrect = q.answers.reduce(
          (p, c, i) => p && c.isCorrect === submittedAnswers[q.id][i],
          true,
        );
        return p + Number(isAnswerCorrect);
      }
      return p;
    },
    0,
  );

  const score = (correct / questions.length * 100) | 0;
  
  

  const textActivity = activity.type == 'text' && <TextContent activity={activity}/>;
  const textCourseComplete = (
    <>
      <Text style={{
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 24
      }}>🎉🎉🎉</Text>
      <Text style={{
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 24
      }}> {correct} out of {questions.length}</Text>
      <Text style={{
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 48
      }}>Score: {score}%</Text>
    </>
  )

  const startOverButton = <View style={styles.container}>
    <Button
      title="Start Over"
      style={styles.button}
      onPress={() => dispatch(actions.resetCourse())}
    />
</View>


  const mainArea = (
    <View style={styles.container}>
      <View style={styles.scrollViewContainer}>
        <ScrollView key="main" contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            {isCourseComplete ? textCourseComplete : textActivity}
            {activity.type == 'question' && (
              <QuestionContent
                activity={activity}
                onComplete={onQuestionComplete}
              />
            )}
          </View>
        </ScrollView>
      </View>
      {isCourseComplete && startOverButton}
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
          title={`${course.name} Complete!`}
          variant="bottom"
          color={secondaryColor.main}
          tintColor={secondaryColor.on}
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
