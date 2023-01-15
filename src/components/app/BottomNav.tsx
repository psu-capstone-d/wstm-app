import React, {useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import {
  PaletteColor,
  Pressable,
  Text,
  usePaletteColor,
} from '@react-native-material/core'
import {actions, useAppDispatch, useAppSelector} from '../../store'
import {Screen} from '../../types'

const makeStyles = (primaryColor: PaletteColor, secondaryColor: PaletteColor) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    tab: {
      backgroundColor: primaryColor.main,
      flexGrow: 1,
      padding: 18,
      alignItems: 'center',
      borderTopColor: 'transparent',
      borderTopWidth: 5,
    },
    tabSelected: {
      borderTopColor: secondaryColor.main,
    },
    tabText: {
      color: primaryColor.on,
    },
    tabSelectedText: {
      color: secondaryColor.on,
    },
  })

const BottomNav = () => {
  const dispatch = useAppDispatch()
  const {currentScreen} = useAppSelector(state => state.ui)
  const primaryColor = usePaletteColor('primary')
  const secondaryColor = usePaletteColor('secondary')
  const styles = useMemo(
    () => makeStyles(primaryColor, secondaryColor),
    [primaryColor, secondaryColor],
  )
  const setScreen = (screen: Screen) => () =>
    dispatch(actions.setScreen(screen))
  const selectedStyle = {[currentScreen]: styles.tabSelected}
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.tab, selectedStyle.course]}
        onPress={setScreen('course')}>
        <Text style={styles.tabText}>Course</Text>
      </Pressable>
      <Pressable
        style={[styles.tab, selectedStyle.settings]}
        onPress={setScreen('settings')}>
        <Text style={styles.tabText}>Settings</Text>
      </Pressable>
    </View>
  )
}

export default BottomNav
