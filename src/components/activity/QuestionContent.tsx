import React, {useEffect, useMemo, useState} from 'react'
import {Answer, QuestionActivity} from 'src/types'
import Section from 'src/components/layout/Section'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import {StyleSheet, Text, View} from 'react-native'
import {Button, usePaletteColor} from '@react-native-material/core'
import {useAppSelector} from 'src/store'
import {CheckedAnswers} from 'src/types'

const styles = StyleSheet.create({
  answerContainer: {
    paddingRight: 24,
    paddingVertical: 6,
    textAlign: 'left',
    marginHorizontal: 24,
    marginRight: 30,
  },
  submitContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  explanationText: {
    paddingTop: 8,
    paddingLeft: 42,
    paddingBottom: 16,
  },
})

const QuestionContent: React.FC<{
  activity: QuestionActivity
  onComplete: (checked: CheckedAnswers) => void
}> = ({activity, onComplete}) => {
  const [checked, setChecked] = useState<CheckedAnswers>([])
  const [didSubmit, setDidSubmit] = useState(false)
  const primaryColor = usePaletteColor('primary')
  const readyToSubmit = useMemo(() => Boolean(checked.find(v => v)), [checked])
  const isMulti = activity.choice == 'multi'
  const submittedAnswer = useAppSelector(
    state => state.submittedAnswers[activity.id],
  )
  useEffect(() => {
    setChecked(
      submittedAnswer ? submittedAnswer : activity.answers.map(() => false),
    )
    setDidSubmit(Boolean(submittedAnswer))
  }, [activity, submittedAnswer])

  const onPress = (answer: Answer, idx: number) => () => {
    if (didSubmit) {
      return
    }
    // initialize a new list of checked states,
    // if this is a multi-choice we make a copy of the current states,
    // otherwise for single-choice we make a new list all set to unchecked
    const checkedUpdate = checked.map(v => (isMulti ? v : false))
    // if multi, allow for toggling a checkbox,
    // otherwise for single, the user can only select a radio (no unselect)
    checkedUpdate[idx] = isMulti ? !checked[idx] : true
    setChecked(checkedUpdate)
  }
  const onSubmit = () => {
    setDidSubmit(true)
    onComplete(checked)
  }

  const fillColor = (idx: number) => {
    if (didSubmit) {
      if (activity.answers[idx].isCorrect) {
        return 'green'
      } else if (checked[idx]) {
        return 'red'
      }
    }
    return primaryColor.main
  }

  return (
    <>
      <Section>{activity.text}</Section>
      {activity.answers.map((answer, idx) => (
        <View style={styles.answerContainer} key={idx}>
          <BouncyCheckbox
            disableBuiltInState
            innerIconStyle={isMulti && {borderRadius: 0}}
            iconStyle={[isMulti && {borderRadius: 0}]}
            fillColor={fillColor(idx)}
            isChecked={checked[idx]}
            onPress={onPress(answer, idx)}
            textStyle={{
              textDecorationLine: 'none',
            }}
            text={answer.text}
          />

          {didSubmit && answer.explanation && (
            <Text style={styles.explanationText}>{answer.explanation}</Text>
          )}
        </View>
      ))}
      {!didSubmit && (
        <View style={styles.submitContainer}>
          <Button title="Submit" disabled={!readyToSubmit} onPress={onSubmit} />
        </View>
      )}
    </>
  )
}

export default QuestionContent
