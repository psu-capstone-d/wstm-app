import React, {useEffect, useState} from 'react'
import {StyleSheet, ToastAndroid, View} from 'react-native'
import {BaseScreen} from 'src/components/layout/BaseScreen'
import {Button, Divider} from '@react-native-material/core'
import {actions, SubmittedAnswers, useAppDispatch} from 'src/store'
import {
  courseActivityById,
  courseFirstActivityId,
  courseLastActivityId,
  courseModuleQuestions,
  courseQuestionAnswers,
} from 'src/fixtures'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  divider: {
    marginHorizontal: 8,
    marginVertical: 16,
  },
})

const incorrectAnswers = Object.keys(courseQuestionAnswers)
  .map(k => Number(k))
  .reduce<SubmittedAnswers>((p, questionId) => {
    const question = courseActivityById[questionId]
    if (question.choice == 'multi') {
      return {
        ...p,
        [question.id]: question.answers.map(a => !a.isCorrect),
      }
    } else {
      // for single choice questions, randomly pick one of the wrong answers
      const wrongChoice = question.answers
        .reduce(
          (p, c, i) => [...p, ...(c.isCorrect ? [i] : [])],
          [] as number[],
        )
        .map((choice: number): {choice: number; sort: number} => ({
          choice,
          sort: Math.random(),
        }))
        .sort((a, b) => a.sort - b.sort)
        .map(({choice}): number => choice)
        .pop() as number
      const checked = Array(question.answers.length).fill(false)
      checked[wrongChoice] = false
      return {
        ...p,
        [question.id]: question.answers.map(a => !a.isCorrect),
      }
    }
  }, {})

const DeveloperScreen = () => {
  const [statusText, setStatusText] = useState('')
  const dispatch = useAppDispatch()
  useEffect(() => {
    const timeoutID = statusText
      ? setTimeout(() => {
          setStatusText('')
        }, 5000)
      : -1
    return () => {
      clearTimeout(timeoutID)
    }
  }, [statusText])
  const resetCourse = () => {
    ToastAndroid.show('Course progress and scores reset', ToastAndroid.SHORT)
    dispatch(actions.clearCheckedAnswers())
    dispatch(actions.setHighestActivityId(courseFirstActivityId))
  }
  const setScore100 = () => {
    ToastAndroid.show('Course score set to 100', ToastAndroid.SHORT)
    dispatch(actions.setCheckedAnswers(courseQuestionAnswers))
    dispatch(actions.setCurrentActivityId(courseLastActivityId))
  }
  const setScore0 = () => {
    ToastAndroid.show('Course score set to 0', ToastAndroid.SHORT)
    dispatch(actions.setCheckedAnswers(incorrectAnswers))
    dispatch(actions.setCurrentActivityId(courseLastActivityId))
  }
  const setScoreOnePerModule = () => {
    ToastAndroid.show('1 correct score set per module', ToastAndroid.SHORT)
    const checkedAnswers = {
      ...incorrectAnswers,
      ...courseModuleQuestions.reduce(
        (p, q) => ({
          ...p,
          [q.questions[0].id]: q.questions[0].answers.map(a => a.isCorrect),
        }),
        {},
      ),
    }
    dispatch(actions.setCheckedAnswers(checkedAnswers))
  }
  const setScoreRandom = () => {
    ToastAndroid.show('Course scores set to random', ToastAndroid.SHORT)
    const checkedAnswers = Object.keys(courseQuestionAnswers)
      .map(k => Number(k))
      .reduce(
        (p, c) => ({
          ...p,
          [c]:
            Math.random() < 0.5
              ? courseQuestionAnswers[c]
              : incorrectAnswers[c],
        }),
        {} as SubmittedAnswers,
      )
    dispatch(actions.setCheckedAnswers(checkedAnswers))
    dispatch(actions.setHighestActivityId(courseLastActivityId))
  }
  return (
    <BaseScreen>
      <View style={styles.container}>
        <Button title="Reset Course" onPress={resetCourse} />
        <Divider style={styles.divider} />
        <Button title="Complete with 100% Score" onPress={setScore100} />
        <Divider style={styles.divider} />
        <Button title="Complete with 0% Score" onPress={setScore0} />
        <Divider style={styles.divider} />
        <Button
          title="Complete with 1 Correct Per Module"
          onPress={setScoreOnePerModule}
        />
        <Divider style={styles.divider} />
        <Button title="Complete with Random Scores" onPress={setScoreRandom} />
      </View>
    </BaseScreen>
  )
}

export default DeveloperScreen
