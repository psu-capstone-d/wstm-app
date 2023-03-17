import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {BaseScreen} from 'src/components/layout/BaseScreen'
import {actions, useAppDispatch, useAppSelector} from 'src/store'
import {Button} from '@react-native-material/core'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    marginHorizontal: 20,
  },
})

const IntroScreen = () => {
  const {savedStateIsLoaded, didLoadSavedProgress} = useAppSelector(
    state => state.ui,
  )
  const dispatch = useAppDispatch()
  return (
    <BaseScreen>
      <View style={styles.container}>
        <Text style={styles.text}>Web Security</Text>
        <Text style={styles.text}>Training Modules</Text>
        {savedStateIsLoaded && didLoadSavedProgress && (
          <Button
            title="Resume"
            style={styles.button}
            onPress={() => dispatch(actions.resume())}
          />
        )}
        {savedStateIsLoaded && (
          <Button
            title="Begin"
            style={styles.button}
            onPress={() => dispatch(actions.resetCourse())}
          />
        )}
      </View>
    </BaseScreen>
  )
}

export default IntroScreen
