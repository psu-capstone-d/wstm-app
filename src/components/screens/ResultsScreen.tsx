import React, {PropsWithChildren, useEffect, useMemo} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {BaseScreen} from 'src/components/layout/BaseScreen'
import {
  AppBar,
  Button,
  IconButton,
  PaletteColor,
  usePaletteColor,
} from '@react-native-material/core'
import {actions, useAppDispatch, useAppSelector} from 'src/store'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {courseModuleQuestions, courseQuestions} from 'src/fixtures'
import CircularProgress from 'react-native-circular-progress-indicator'
import {useIsDarkMode} from 'src/hooks'

const makeStyles = (isDarkMode: boolean, primaryColor: PaletteColor) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      marginTop: 10,
    },
    divider: {
      backgroundColor: isDarkMode ? '#ccc' : '#999',
      marginHorizontal: 8,
      marginVertical: 16,
    },
    row: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 5,
    },
    moduleTitle: {
      color: primaryColor.main,
      fontSize: 20,
      fontWeight: 'bold',
    },
    column: {
      flex: 1,
      justifyContent: 'center',
      flexBasis: 1,
    },
  })

const ResultsScreen = () => {
  const dispatch = useAppDispatch()
  const {submittedAnswers, currentScreen} = useAppSelector(
    ({submittedAnswers, ui: {currentScreen}}) => ({
      submittedAnswers,
      currentScreen,
    }),
  )
  const primaryColor = usePaletteColor('primary')
  const isDarkMode = useIsDarkMode()
  const styles = useMemo(
    () => makeStyles(isDarkMode, primaryColor),
    [isDarkMode, primaryColor],
  )
  const hasSubmitEveryQuestion = useMemo(
    () =>
      Object.keys(submittedAnswers).length ==
      Object.keys(courseQuestions).length,
    [submittedAnswers],
  )
  const scores = useMemo(
    () =>
      hasSubmitEveryQuestion
        ? courseModuleQuestions.map(
            q =>
              (q.questions.reduce(
                (moduleScore, q) =>
                  moduleScore +
                  (q.answers.reduce(
                    (p, a, i) => p && a.isCorrect == submittedAnswers[q.id][i],
                    true,
                  )
                    ? 1
                    : 0),
                0,
              ) /
                q.questions.length) *
              100,
          )
        : [],
    [hasSubmitEveryQuestion, submittedAnswers],
  )
  const totalScore = useMemo(
    () =>
      scores.length > 0 ? scores.reduce((p, c) => p + c, 0) / scores.length : 0,
    [scores],
  )
  useEffect(() => {
    if (!hasSubmitEveryQuestion && currentScreen == 'results') {
      dispatch(actions.setScreen('course'))
    }
  }, [currentScreen, dispatch, hasSubmitEveryQuestion])

  const ResultRow: React.FC<
    PropsWithChildren<{
      score: number
      label: string
    }>
  > = ({score, label}) => (
    <View style={styles.row}>
      <View style={styles.column}>
        <CircularProgress
          value={score}
          radius={50}
          activeStrokeColor={primaryColor.main}
          progressValueColor={primaryColor.main}
        />
      </View>
      <View style={styles.column}>
        <Text style={[styles.moduleTitle]}>{label}</Text>
      </View>
    </View>
  )

  return (
    <BaseScreen>
      <AppBar
        title="Results"
        leading={props => (
          <IconButton
            onPress={() => dispatch(actions.setScreen('course'))}
            icon={props => <Icon name="keyboard-backspace" {...props} />}
            {...props}
          />
        )}
      />
      <View style={styles.container}>
        {scores.map((moduleScore, i) => (
          <ResultRow
            key={i}
            score={moduleScore}
            label={courseModuleQuestions[i].title}
          />
        ))}
        <ResultRow score={totalScore} label="Overall Score" />
      </View>
    </BaseScreen>
  )
}

export default ResultsScreen
